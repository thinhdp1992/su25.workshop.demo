import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

// Import sample images from assets
import flower1 from '../assets/images/1.jpg';
import flower2 from '../assets/images/2.jpg';
import flower3 from '../assets/images/3.jpg';
import flower4 from '../assets/images/4.jpg';
import flower5 from '../assets/images/5.jpg';
import flower6 from '../assets/images/1.jpg';

function Shop() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All Flowers' },
        { id: 'bouquets', name: 'Bouquets' },
        { id: 'arrangements', name: 'Arrangements' },
        { id: 'single', name: 'Single Flowers' },
        { id: 'plants', name: 'Plants' }
    ];

    useEffect(() => {
        // In a real app, this would be an API call
        const allProducts = [
            {
                id: 1,
                name: 'Rose Bouquet',
                description: 'A beautiful bouquet of fresh roses in various colors.',
                price: 49.99,
                image: flower1,
                category: 'bouquets'
            },
            {
                id: 2,
                name: 'Orchid Collection',
                description: 'Exotic orchids that bring elegance to any space.',
                price: 59.99,
                image: flower2,
                category: 'plants'
            },
            {
                id: 3,
                name: 'Tulip Arrangement',
                description: 'Colorful tulips arranged in a stylish vase.',
                price: 39.99,
                image: flower3,
                category: 'arrangements'
            },
            {
                id: 4,
                name: 'Lily Bouquet',
                description: 'Fragrant lilies that make a perfect gift.',
                price: 44.99,
                image: flower4,
                category: 'bouquets'
            },
            {
                id: 5,
                name: 'Single Rose',
                description: 'A perfect single rose for a romantic gesture.',
                price: 9.99,
                image: flower5,
                category: 'single'
            },
            {
                id: 6,
                name: 'Succulent Garden',
                description: 'A collection of beautiful succulents in a decorative pot.',
                price: 34.99,
                image: flower6,
                category: 'plants'
            },
            {
                id: 7,
                name: 'Sunflower Bouquet',
                description: 'Bright and cheerful sunflowers to brighten any day.',
                price: 29.99,
                image: flower1,
                category: 'bouquets'
            },
            {
                id: 8,
                name: 'Mixed Flower Arrangement',
                description: 'A stunning arrangement of seasonal flowers.',
                price: 54.99,
                image: flower3,
                category: 'arrangements'
            }
        ];

        setProducts(allProducts);
        setFilteredProducts(allProducts);
    }, []);

    const handleSearch = (results) => {
        // In a real app, we would process the search results here
        console.log("Search results:", results);
    };

    const filterByCategory = (categoryId) => {
        setActiveCategory(categoryId);
        if (categoryId === 'all') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product => product.category === categoryId));
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Shop Our Collection</h1>

                <div className="mb-8">
                    <SearchBar onSearch={handleSearch} />
                </div>

                <div className="mb-8 overflow-x-auto">
                    <div className="flex space-x-2 pb-2">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => filterByCategory(category.id)}
                                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeCategory === category.id
                                    ? 'bg-pink-500 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">No products found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Shop;
