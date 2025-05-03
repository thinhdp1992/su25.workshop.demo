from transformers import CLIPProcessor, CLIPModel
import torch
from PIL import Image
import os
import pickle
import numpy as np

# Load the pre-trained CLIP model and its corresponding processor from Hugging Face
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

# Define the folder containing the images
IMAGE_FOLDER = "images/"

# Initialize lists to store image embeddings and their file paths
image_embeddings = []
image_paths = []

# Iterate through all image files in the specified folder
for filename in os.listdir(IMAGE_FOLDER):
    if filename.endswith((".png", ".jpg", ".jpeg")):
        path = os.path.join(IMAGE_FOLDER, filename)
        image = Image.open(path).convert("RGB")  # Open and convert the image to RGB

        # Preprocess the image using the CLIP processor
        inputs = processor(images=image, return_tensors="pt")
        
        # Extract image features without computing gradients (for efficiency)
        with torch.no_grad():
            outputs = model.get_image_features(**inputs)
        
        # Normalize the output feature vector (L2 normalization)
        embedding = outputs / outputs.norm(p=2, dim=-1, keepdim=True)
        
        # Store the embedding and corresponding image path
        image_embeddings.append(embedding.cpu().numpy())
        image_paths.append(path)

# Save the image paths and their embeddings to a pickle file for later use
with open("image_db.pkl", "wb") as f:
    pickle.dump((image_paths, np.vstack(image_embeddings)), f)
