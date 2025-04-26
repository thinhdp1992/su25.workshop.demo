import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");

  const apiURL = import.meta.env.VITE_API_URL;
  const handleGenerate = async () => {
    const res = await fetch(`${apiURL}/generate-image`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    console.log(data)
    setImage("data:image/png;base64," + data.image_base64);
  };
  // console.log(data)
  return (
    <div>
      <input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter prompt" />
      <button onClick={handleGenerate}>Generate</button>
      {image && <img src={image} alt="Generated" style={{ maxWidth: "500px" }} />}
    </div>
  );
}

export default App
