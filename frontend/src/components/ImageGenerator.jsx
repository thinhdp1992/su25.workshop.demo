import { useState } from 'react';

function ImageGenerator() {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const apiURL = import.meta.env.VITE_API_URL;

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiURL}/generate-image`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt })
            });

            const data = await res.json();
            setImage("data:image/png;base64," + data.image_base64);
        } catch (error) {
            console.error("Image generation error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Flower Image Generator</h2>

            <form onSubmit={handleGenerate} className="mb-8">
                <div className="mb-4">
                    <label htmlFor="prompt" className="block text-gray-700 mb-2">Describe the flower image you want to create</label>
                    <textarea
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="E.g., A bouquet of red roses with white lilies in a crystal vase"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 min-h-[100px]"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn-primary w-full sm:w-auto"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </div>
                    ) : (
                        "Generate Image"
                    )}
                </button>
            </form>

            {image && (
                <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Generated Image</h3>
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={image}
                            alt="Generated flower"
                            className="w-full h-auto object-contain max-h-[500px]"
                        />
                    </div>
                    <div className="mt-4 flex justify-end">
                        <a
                            href={image}
                            download="generated-flower.png"
                            className="text-pink-500 hover:text-pink-700 font-medium flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Download Image
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImageGenerator;
