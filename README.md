
# Flowers Image and Chat System

This project is a full-stack application that provides functionalities for generating images, searching images, chatting about flowers, and captioning images. The system includes a web application and a mobile app. The backend is built with **FastAPI** and utilizes machine learning models for image generation, text-image retrieval, and image captioning, while the web frontend is developed using **ReactJS**, **Vite**, and **TailwindCSS**, and the mobile app is built with **React Native** using **Expo**.

## Features
1. **Image Generation**: Generate flower images based on text prompts using Stable Diffusion.
2. **Image Search**: Search for existing flower images that best match a text description using CLIP.
3. **Flowers Chatbot**: Interact with a chatbot specialized in answering questions about flowers using TinyLlama.
4. **Image Captioning**: Upload a flower photo and get an AI-generated description using a Vision Transformer and GPT-2 model (available on mobile).

## Tech Stack
- **Backend**: Python, FastAPI, PyTorch, Stable Diffusion, CLIP, TinyLlama, VisionEncoderDecoderModel (for image captioning)
- **Web Frontend**: ReactJS, Vite, TailwindCSS
- **Mobile App**: React Native, Expo, React Navigation, Expo Image Picker
- **Other**: CORS middleware, base64 image encoding, environment variables

## Prerequisites
Before running the project, ensure you have the following installed:
- Python 3.9+
- Node.js 16+
- Git
- CUDA-compatible GPU (optional, for faster image generation)
- A package manager like `pip` or `conda` for Python dependencies
- `npm` or `yarn` for frontend and mobile dependencies
- Expo CLI for mobile development:
  ```bash
  npm install -g create-expo-app
  ```
- Expo Go app on your iOS/Android device (for mobile testing)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Backend Setup

1. **Create a virtual environment** (optional but recommended):
   - Download and install Anaconda from [https://www.anaconda.com/products/distribution](https://www.anaconda.com/products/distribution).
   - Follow the installation instructions for your operating system (Windows, macOS, or Linux).
   - Create a virtual environment
     ```bash
     conda create -n backend_env python=3.9
     conda activate backend_env
     ```

2. **Navigate to the backend directory** (if applicable, or stay in the root if backend files are there):
   ```bash
   cd backend.python
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

### 3. Web Frontend Setup
1. **Navigate to the frontend directory** (if applicable, or stay in the root if frontend files are there):
   ```bash
   cd frontend.web
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

### 4. Mobile App Setup
1. **Navigate to the mobile directory**:
   ```bash
   cd frontend.mobile
   ```

2. **Install dependencies**:
   Install the required dependencies for navigation, icons, image picking, and AsyncStorage:
   ```bash
   npm install
   ```

4. **Configure environment variables**:
   - Create a `.env` file in the frontend.mobile directory.
   - Add the backend API endpoint:
     ```
     EXPO_PUBLIC_API_URL=<your-computer-ip>:8000 (e.g., http://192.168.1.10:8000)
     ```

5. **Run the mobile app**:
   Start the Expo development server:
   ```bash
   npm start
   ```
   - For Android emulator: Press `a` to run on Android.
   - For iOS simulator: Press `i` to run on iOS.
   - For physical devices: Scan the QR code with the Expo Go app.

### 5. Accessing the Application
- **Web**: Open your browser and navigate to `http://localhost:5173` to access the web frontend.
- **Mobile**:
  - **On an Emulator/Simulator**:
    - **Android Emulator**: Use the Expo Go app or run the app on an Android emulator. Since the emulator cannot access `localhost` directly, ensure the `EXPO_PUBLIC_API_URL` in `.env` is set to `http://10.0.2.2:8000`. Alternatively, find your computer's IP address using `ipconfig` (Windows) or `ifconfig` (macOS/Linux) and update `EXPO_PUBLIC_API_URL` to `http://<your-computer-ip>:8000`.
    - **iOS Simulator**: Use the Expo Go app or run the app on an iOS simulator. The iOS simulator can typically access `localhost`, so `http://localhost:8000` should work. If it doesn't, use your computer's IP address as described above.
  - **On a Physical Device**: Scan the QR code with the Expo Go app on your iOS/Android device. Update `EXPO_PUBLIC_API_URL` to use your computer's IP address (e.g., `http://192.168.1.x:8000`), as physical devices cannot access `localhost` on your computer.

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
   - **Request Body**: `{ "history": [{ "role": "user", "content": "What is a flower?" }, { "role": "assistant", "content": "A flower is..." }] }`
   - **Response**: `{ "answer": "Response about flowers" }`
   - Interacts with the flower-specialized chatbot.

4. **POST `/caption-image`**:
   - **Request Body**: `{ "image": "<base64-encoded-image>" }`
   - **Response**: `{ "caption": "A close-up of a pink flower with green leaves." }`
   - Generates a caption for an uploaded image (used by mobile).

## Usage

### Web Application
1. **Generate an Image**:
   - Use the web interface to input a text prompt (e.g., "A vibrant purple flower").
   - The generated image will be displayed as a base64-encoded string converted to an image.

2. **Search for an Image**:
   - Enter a text description in the web frontend (e.g., "A white flower with green leaves").
   - The system will return the most similar image from the precomputed database.

3. **Chat about Flowers**:
   - Use the chat interface to ask questions about flowers (e.g., "How do I care for an flower?").
   - The chatbot will respond with relevant information.

### Mobile Application
The mobile app has four bottom tab screens:
1. **Home Screen**:
   - Displays a welcome message and placeholder for featured collections.
   - Can be extended to fetch and display products from an API.

2. **Image Captioning Screen**:
   - Upload a flower photo or take a new one using the camera.
   - The app sends the image to the `/caption-image` endpoint and displays the generated caption.

3. **Image Generation Screen**:
   - Enter a text prompt to generate a flower image using the `/generate-image` endpoint.
   - Displays the generated image.

4. **Profile Screen**:
   - View and edit user profile details (username and email).
   - Persists data locally using AsyncStorage.

## Notes
- **CUDA Support**: If a CUDA-compatible GPU is available, the backend will use it for faster image generation. Otherwise, it will fall back to CPU.
- **CORS**: The backend allows all origins by default (`allow_origins=["*"]`). For production, restrict this to specific origins (e.g., `["http://localhost:5173"]`).
- **Image Database**: Ensure the `image_db.pkl` file is correctly formatted and contains valid image paths and embeddings.
- **Model Weights**: The backend loads large models (Stable Diffusion, CLIP, TinyLlama). Ensure you have sufficient disk space and RAM.
- **Mobile Networking**:
  - For Android emulators, use `http://10.0.2.2:8000` to access the backend running on `localhost`.
  - For physical devices, use your computer’s local IP address (e.g., `http://192.168.1.x:8000`).

## Troubleshooting
- **Backend not starting**:
  - Check if all Python dependencies are installed.
  - Verify that `image_db.pkl` exists and is accessible.
  - Ensure the correct CUDA version is installed if using a GPU.
- **Slow performance**:
  - If running on CPU, image generation may be slow. Consider using a GPU for better performance.
  - Reduce the model’s memory footprint by using smaller models if necessary.

### Web Frontend
- **Frontend not connecting to backend**:
  - Confirm the `VITE_API_URL` in `.env` matches the backend URL (`http://localhost:8000`).
  - Check for CORS issues in the browser console.

### Mobile App
- **Images not loading in emulator**:
  - Emulators don’t have photos by default. Add photos to the emulator:
    - **Android**: Use Android Studio’s Device File Explorer to upload images to `/sdcard/DCIM/`.
    - **iOS**: Drag and drop images onto the simulator.
  - Ensure permissions are granted in the emulator settings.
- **Backend not reachable from mobile**:
  - Verify the `EXPO_PUBLIC_API_URL` in `.env` is set correctly (`http://10.0.2.2:8000` for Android emulators).
  - For physical devices, use your computer’s local IP address.
  - Check if the backend server is running and accessible (test with Postman or `curl`).
- **Image captioning fails**:
  - Check the Expo console for errors in the `fetch` request.
  - Verify the `/caption-image` endpoint works by testing it with Postman.
  - Ensure the base64-encoded image is being sent correctly.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.