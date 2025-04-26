import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import ChatBox from '../components/ChatBox';

// Import sample images from assets
import flower1 from '../assets/images/1.jpg';
import flower2 from '../assets/images/2.jpg';
import flower3 from '../assets/images/3.jpg';
import flower4 from '../assets/images/4.jpg';

function Home() {
    const [searchResults, setSearchResults] = useState(null);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        // In a real app, this would be an API call
        setFeaturedProducts([
            {
                id: 1,
                name: 'Rose Bouquet',
                description: 'A beautiful bouquet of fresh roses in various colors.',
                price: 49.99,
                image: flower1
            },
            {
                id: 2,
                name: 'Orchid Collection',
                description: 'Exotic orchids that bring elegance to any space.',
                price: 59.99,
                image: flower2
            },
            {
                id: 3,
                name: 'Tulip Arrangement',
                description: 'Colorful tulips arranged in a stylish vase.',
                price: 39.99,
                image: flower3
            },
            {
                id: 4,
                name: 'Lily Bouquet',
                description: 'Fragrant lilies that make a perfect gift.',
                price: 44.99,
                image: flower4
            }
        ]);
    }, []);

    const handleSearch = (results) => {
        setSearchResults(results);
        // In a real app, we would process the search results here
        console.log("Search results:", results);
    };

    return (
        <div>
            <Hero />

            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Find Your Perfect Flowers</h2>
                    <SearchBar onSearch={handleSearch} />

                    {searchResults && (
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold mb-4">Search Results</h3>
                            {/* Display search results here */}
                            <p className="text-gray-600">
                                {searchResults.image_base64
                                    ? "Found matching flowers! Check out our recommendations below."
                                    : "No matching flowers found. Try a different search term."}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <section id="featured" className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Featured Collections</h2>
                    <p className="text-gray-600 text-center mb-12">Discover our most popular flower arrangements</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/shop" className="btn-primary">
                            View All Collections
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-pink-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Create Custom Flower Designs</h2>
                        <p className="text-gray-600 mb-8">
                            Use our AI-powered image generator to visualize your dream flower arrangements before ordering.
                        </p>
                        <Link to="/image-generator" className="btn-primary">
                            Try Image Generator
                        </Link>
                    </div>
                </div>
            </section>

            <ChatBox />
        </div>
    );
}

export default Home;
