import { useState } from 'react';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const apiURL = import.meta.env.VITE_API_URL;

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        try {
            const res = await fetch(`${apiURL}/search-image`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: query })
            });

            const data = await res.json();
            onSearch(data);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto">
            <div className="flex rounded-lg overflow-hidden shadow-lg">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for flowers..."
                    className="flex-grow px-4 py-3 focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-pink-500 text-white px-6 py-3 font-medium hover:bg-pink-600 transition-colors"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <span>Search</span>
                    )}
                </button>
            </div>
        </form>
    );
}

export default SearchBar;
