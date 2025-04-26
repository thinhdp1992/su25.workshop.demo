from transformers import CLIPProcessor, CLIPModel
import torch
from PIL import Image
import os
import pickle
import numpy as np

# Load model
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

IMAGE_FOLDER = "images/"

image_embeddings = []
image_paths = []

for filename in os.listdir(IMAGE_FOLDER):
    if filename.endswith((".png", ".jpg", ".jpeg")):
        path = os.path.join(IMAGE_FOLDER, filename)
        image = Image.open(path).convert("RGB")
        
        inputs = processor(images=image, return_tensors="pt")
        with torch.no_grad():
            outputs = model.get_image_features(**inputs)
        
        embedding = outputs / outputs.norm(p=2, dim=-1, keepdim=True)  # Normalize
        image_embeddings.append(embedding.cpu().numpy())
        image_paths.append(path)

with open("image_db.pkl", "wb") as f:
    pickle.dump((image_paths, np.vstack(image_embeddings)), f)
