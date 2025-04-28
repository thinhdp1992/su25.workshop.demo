import { useState } from 'react';

function ImageGenerator() {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const apiURL = import.meta.env.VITE_API_URL;

    const examplePrompts = [
        "A bouquet of red roses and white lilies",
        "Colorful spring flowers in a vintage vase",
        "Wedding centerpiece with pastel flowers",
        "Modern minimalist flower arrangement"
    ];

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

    const useExamplePrompt = (examplePrompt) => {
        setPrompt(examplePrompt);
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
                    className={`w-full sm:w-auto px-6 py-3 rounded-lg font-bold text-white shadow-md transition-all ${loading
                        ? 'bg-gradient-to-r from-pink-400 to-pink-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 hover:shadow-lg transform hover:-translate-y-0.5'
                        }`}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Generating...</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828l-3.172-3.172a2 2 0 00-2.828 0L8 8.243V16h2v-1.757z" clipRule="evenodd" />
                            </svg>
                            <span>Generate Image</span>
                        </div>
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

            <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Try these examples:</h3>
                <div className="flex flex-col space-y-2">
                    {examplePrompts.map((examplePrompt, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => useExamplePrompt(examplePrompt)}
                            className="w-full text-left px-4 py-3 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition-colors font-medium border border-pink-100 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                            </svg>
                            {examplePrompt}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ImageGenerator;
