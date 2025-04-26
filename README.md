
# Flowers Image and Chat System

This project is a full-stack application that provides functionalities for generating images, searching images, and chatting about flowers. The backend is built with **FastAPI** and utilizes machine learning models for image generation and text-image retrieval, while the frontend is developed using **ReactJS**, **Vite**, and **TailwindCSS**.

## Features
1. **Image Generation**: Generate flower images based on text prompts using Stable Diffusion.
2. **Image Search**: Search for existing flower images that best match a text description using CLIP.
3. **Flowers Chatbot**: Interact with a chatbot specialized in answering questions about flowers using TinyLlama.

## Tech Stack
- **Backend**: Python, FastAPI, PyTorch, Stable Diffusion, CLIP, TinyLlama
- **Frontend**: ReactJS, Vite, TailwindCSS
- **Other**: CORS middleware, base64 image encoding, environment variables

## Prerequisites
Before running the project, ensure you have the following installed:
- Python 3.9+
- Node.js 16+
- Git
- CUDA-compatible GPU (optional, for faster image generation)
- A package manager like `pip` or `conda` for Python dependencies
- `npm` or `yarn` for frontend dependencies

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Backend Setup
1. **Navigate to the backend directory** (if applicable, or stay in the root if backend files are there):
   ```bash
   cd backend
   ```

2. **Create a virtual environment** (optional but recommended):
   - Download and install Anaconda from [https://www.anaconda.com/products/distribution](https://www.anaconda.com/products/distribution).
   - Follow the installation instructions for your operating system (Windows, macOS, or Linux).
   - Verify the installation by running:
     ```bash
     conda --version
     ```
   - Update Anaconda to the latest version:
     ```bash
     conda update conda
     ```
   - Create a virtual environment
   ```bash
   conda create -n backend_env python=3.9
   conda activate backend_env
   ```

3. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Prepare the image database**:
   - Ensure the `image_db.pkl` file exists in the backend directory. This file should contain precomputed image paths and embeddings for the `/search-image` endpoint.
   - If you need to generate this file, refer to the documentation of your image database creation script.

5. **Run the backend server**:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```
   The backend will be available at `http://localhost:8000`.

### 3. Frontend Setup
1. **Navigate to the frontend directory** (if applicable, or stay in the root if frontend files are there):
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - Create a `.env` file in the frontend directory.
   - Add the backend API endpoint:
     ```
     VITE_API_URL=http://localhost:8000
     ```

4. **Run the frontend development server**:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173` (or another port if specified by Vite).

### 4. Accessing the Application
- Open your browser and navigate to `http://localhost:5173` to access the frontend.
- The frontend should connect to the backend at `http://localhost:8000` for API calls.

## API Endpoints
The backend provides the following endpoints:
1. **POST `/generate-image`**:
   - **Request Body**: `{ "prompt": "A beautiful flower" }`
   - **Response**: `{ "image_base64": "<base64-encoded-image>" }`
   - Generates a new flower image based on the provided text prompt.

2. **POST `/search-image`**:
   - **Request Body**: `{ "prompt": "A red flower in bloom" }`
   - **Response**: `{ "image_base64": "<base64-encoded-image>" }`
   - Searches for the most similar existing flower image based on the text prompt.

3. **POST `/chat-flower`**:
   - **Request Body**: `{ "history": [{ "role": "user", "content": "What is an flower?" }, { "role": "assistant", "content": "An flower is..." }] }`
   - **Response**: `{ "answer": "Response about flowers" }`
   - Interacts with the flower-specialized chatbot.

## Usage
1. **Generate an Image**:
   - Use the frontend interface to input a text prompt (e.g., "A vibrant purple flower").
   - The generated image will be displayed as a base64-encoded string converted to an image.

2. **Search for an Image**:
   - Enter a text description in the frontend (e.g., "A white flower with green leaves").
   - The system will return the most similar image from the precomputed database.

3. **Chat about Flowerss**:
   - Use the chat interface to ask questions about flowers (e.g., "How do I care for an flower?").
   - The chatbot will respond with relevant information.

## Notes
- **CUDA Support**: If a CUDA-compatible GPU is available, the backend will use it for faster image generation. Otherwise, it will fall back to CPU.
- **CORS**: The backend allows all origins by default (`allow_origins=["*"]`). For production, restrict this to specific origins (e.g., `["http://localhost:5173"]`).
- **Image Database**: Ensure the `image_db.pkl` file is correctly formatted and contains valid image paths and embeddings.
- **Model Weights**: The backend loads large models (Stable Diffusion, CLIP, TinyLlama). Ensure you have sufficient disk space and RAM.

## Troubleshooting
- **Backend not starting**:
  - Check if all Python dependencies are installed.
  - Verify that `image_db.pkl` exists and is accessible.
  - Ensure the correct CUDA version is installed if using a GPU.
- **Frontend not connecting to backend**:
  - Confirm the `VITE_API_URL` in `.env` matches the backend URL (`http://localhost:8000`).
  - Check for CORS issues in the browser console.
- **Slow performance**:
  - If running on CPU, image generation may be slow. Consider using a GPU for better performance.
  - Reduce the model’s memory footprint by using smaller models if necessary.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
