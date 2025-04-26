// import { useState } from 'react';
// import './App.css';

// function App() {
//   const [prompt, setPrompt] = useState("");     // User input prompt
//   const [image, setImage] = useState("");        // Base64 image result
//   const [mode, setMode] = useState("generate");  // Mode: "generate" or "search"




//   const apiURL = import.meta.env.VITE_API_URL;

//   // Function to call backend API based on selected mode
//   const handleAction = async () => {
//     const endpoint = mode === "generate" ? "/generate-image" : "/search-image";

//     const res = await fetch(`${apiURL}${endpoint}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ prompt })
//     });
//     const data = await res.json();
//     console.log(data);

//     // Convert base64 to displayable image
//     setImage("data:image/png;base64," + data.image_base64);
//   };





//   const [history, setHistory] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const newHistory = [...history, { role: "user", content: input }];
//     setHistory(newHistory);
//     setLoading(true);

//     const res = await fetch(`${apiURL}/chat-orchid`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ history: newHistory }),
//     });

//     const data = await res.json();
//     setHistory([...newHistory, { role: "assistant", content: data.answer }]);
//     setInput("");
//     setLoading(false);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Text-to-Image / Image Search</h1>

//       {/* Text input for prompt */}
//       <input
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         placeholder="Enter prompt..."
//         style={{ width: "300px", padding: "8px", marginRight: "10px" }}
//       />

//       {/* Dropdown to select mode */}
//       <select
//         value={mode}
//         onChange={(e) => setMode(e.target.value)}
//         style={{ padding: "8px", marginRight: "10px" }}
//       >
//         <option value="generate">Generate New Image</option>
//         <option value="search">Search Existing Image</option>
//       </select>

//       {/* Button to trigger action */}
//       <button onClick={handleAction} style={{ padding: "8px 16px" }}>
//         Submit
//       </button>

//       {/* Display the image */}
//       {image && (
//         <div style={{ marginTop: "20px" }}>
//           <img src={image} alt="Result" style={{ maxWidth: "500px", border: "1px solid #ccc" }} />
//         </div>
//       )}




//       <h2>Chat about Orchids 🌸</h2>
//       <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
//         {history.map((h, idx) => (
//           <div key={idx} style={{ marginBottom: "8px" }}>
//             <b>{h.role === "user" ? "You" : "Bot"}:</b> {h.content}
//           </div>
//         ))}
//       </div>
//       <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about orchids..." />
//       <button onClick={handleSend} disabled={loading}>
//         {loading ? "Thinking..." : "Send"}
//       </button>

//     </div>
//   );
// }

// export default App;

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import ImageGenerator from './pages/ImageGenerator';
import './App.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/image-generator" element={<ImageGenerator />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
