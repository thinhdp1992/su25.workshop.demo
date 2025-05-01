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