import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { products as productData } from '../data';

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
        setProducts(productData);
        setFilteredProducts(productData);
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
