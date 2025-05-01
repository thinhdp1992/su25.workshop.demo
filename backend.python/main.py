from fastapi import FastAPI
from pydantic import BaseModel
from diffusers import StableDiffusionPipeline
from transformers import CLIPProcessor, CLIPModel
from fastapi.middleware.cors import CORSMiddleware
import torch
import base64
from io import BytesIO
import os
import pickle
import numpy as np
from PIL import Image

# Initialize FastAPI app
app = FastAPI()

# Allow CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, or specify ["http://localhost:5173"]
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Print CUDA info
print("CUDA available:", torch.cuda.is_available())
if torch.cuda.is_available():
    print("Using device:", torch.cuda.get_device_name(0))
else:
    print("Using CPU")

# Load Stable Diffusion model
pipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5", torch_dtype=torch.float16)
pipe.to("cuda" if torch.cuda.is_available() else "cpu")

# Request model
class PromptRequest(BaseModel):
    prompt: str

@app.post("/generate-image")
async def generate_image(request: PromptRequest):
    """Generate a new image from text using Stable Diffusion."""
    image = pipe(request.prompt).images[0]

    buffered = BytesIO()
    image.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

    return {"image_base64": img_str}

# Load CLIP model for text-image retrieval
clip_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
clip_processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

# Load precomputed image database
with open("image_db.pkl", "rb") as f:
    image_paths, image_embeddings = pickle.load(f)

# Convert embeddings to torch tensor
image_embeddings = torch.tensor(image_embeddings)

@app.post("/search-image")
async def search_image(request: PromptRequest):
    """Search for the most similar existing image based on a text prompt."""
    # Encode the prompt text into an embedding
    inputs = clip_processor(text=[request.prompt], return_tensors="pt", padding=True)
    with torch.no_grad():
        text_features = clip_model.get_text_features(**inputs)

    # Normalize the embedding
    text_features = text_features / text_features.norm(p=2, dim=-1, keepdim=True)

    # Compute cosine similarity between text and image embeddings
    similarity = (text_features @ image_embeddings.T)[0]

    # Find the index of the most similar image
    best_idx = similarity.argmax().item()
    best_image_path = image_paths[best_idx]

    # Load and convert the image to base64
    image = Image.open(best_image_path).convert("RGB")
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

    return {"image_base64": img_str}


from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
# Load TinyLlama model & tokenizer
model_id = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
    device_map="auto"
)

# Build chat pipeline
llm_pipeline = pipeline("text-generation", model=model, tokenizer=tokenizer)

# Request model
class ChatRequest(BaseModel):
    history: list  # List of {"role": "user"/"assistant", "content": "text"}

@app.post("/chat-flower")
async def chat_flower(request: ChatRequest):
    # Build the prompt from history
    prompt = "### Instruction:\nYou are an expert on flowers. Please answer only questions about flowers carefully and helpfully.\n\n"
    for turn in request.history:
        if turn["role"] == "user":
            prompt += f"### Question:\n{turn['content']}\n"
        elif turn["role"] == "assistant":
            prompt += f"### Answer:\n{turn['content']}\n"
    prompt += "### Answer:\n"

    # Generate answer
    output = llm_pipeline(prompt, max_new_tokens=300, temperature=0.0, do_sample=True)
    full_text = output[0]["generated_text"]

    # Extract the latest answer
    if "### Answer:" in full_text:
        response = full_text.split("### Answer:")[-1].strip()
    else:
        response = full_text.strip()

    return {"answer": response}


from transformers import VisionEncoderDecoderModel, ViTImageProcessor, AutoTokenizer

# Load Image Captioning model
caption_model_id = "nlpconnect/vit-gpt2-image-captioning"
caption_model = VisionEncoderDecoderModel.from_pretrained(caption_model_id)
caption_processor = ViTImageProcessor.from_pretrained(caption_model_id)
caption_tokenizer = AutoTokenizer.from_pretrained(caption_model_id)

caption_model.to("cuda" if torch.cuda.is_available() else "cpu")

# Request model
class ImageRequest(BaseModel):
    image_base64: str  # Image sent as base64 encoded string

@app.post("/caption-image")
async def caption_image(request: ImageRequest):
    """Generate a caption for an uploaded image."""

    # Decode base64 to PIL Image
    image_data = base64.b64decode(request.image_base64)
    image = Image.open(BytesIO(image_data)).convert("RGB")

    # Preprocess image
    pixel_values = caption_processor(images=image, return_tensors="pt").pixel_values
    pixel_values = pixel_values.to("cuda" if torch.cuda.is_available() else "cpu")

    # Generate caption
    with torch.no_grad():
        output_ids = caption_model.generate(pixel_values, max_length=50, num_beams=4)
    caption = caption_tokenizer.decode(output_ids[0], skip_special_tokens=True)

    return {"caption": caption}
# Run the server with: uvicorn main:app --host 0.0.0.0 --port 8000
