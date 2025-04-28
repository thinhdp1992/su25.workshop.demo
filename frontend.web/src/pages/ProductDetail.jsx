import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Import sample images from assets
import flower1 from '../assets/images/1.jpg';
import flower2 from '../assets/images/2.jpg';
import flower3 from '../assets/images/3.jpg';
import flower4 from '../assets/images/4.jpg';
import flower5 from '../assets/images/5.jpg';
import flower6 from '../assets/images/1.jpg';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, this would be an API call to fetch product by ID
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            const productData = {
                1: {
                    id: 1,
                    name: 'Rose Bouquet',
                    description: 'A beautiful bouquet of fresh roses in various colors. Perfect for anniversaries, birthdays, or just to show someone you care.',
                    price: 49.99,
                    image: flower1,
                    category: 'bouquets',
                    details: [
                        'Contains 12 premium roses',
                        'Available in red, pink, white, or mixed colors',
                        'Wrapped in premium paper with ribbon',
                        'Includes a personalized message card'
                    ]
                },
                2: {
                    id: 2,
                    name: 'Orchid Collection',
                    description: 'Exotic orchids that bring elegance to any space. These long-lasting flowers will brighten up any room for weeks.',
                    price: 59.99,
                    image: flower2,
                    category: 'plants',
                    details: [
                        'Includes 2-3 orchid stems in a decorative pot',
                        'Available in white, purple, or pink',
                        'Low maintenance, perfect for beginners',
                        'Lasts 2-3 months with proper care'
                    ]
                },
                3: {
                    id: 3,
                    name: 'Tulip Arrangement',
                    description: 'Colorful tulips arranged in a stylish vase. A classic choice that brings the freshness of spring into any home.',
                    price: 39.99,
                    image: flower3,
                    category: 'arrangements',
                    details: [
                        'Contains 15-20 tulips',
                        'Available in various color combinations',
                        'Comes in a glass vase',
                        'Perfect for home or office decoration'
                    ]
                },
                4: {
                    id: 4,
                    name: 'Lily Bouquet',
                    description: 'Fragrant lilies that make a perfect gift. Their sweet scent and elegant appearance make them a favorite for special occasions.',
                    price: 44.99,
                    image: flower4,
                    category: 'bouquets',
                    details: [
                        'Contains 8-10 lilies',
                        'Available in white, pink, or stargazer varieties',
                        'Wrapped in premium paper',
                        'Long-lasting blooms'
                    ]
                },
                5: {
                    id: 5,
                    name: 'Single Rose',
                    description: 'A perfect single rose for a romantic gesture. Sometimes simplicity makes the strongest statement.',
                    price: 9.99,
                    image: flower5,
                    category: 'single',
                    details: [
                        'One premium long-stem rose',
                        'Available in red, pink, white, or yellow',
                        'Wrapped in elegant paper with ribbon',
                        'Includes a small message card'
                    ]
                },
                6: {
                    id: 6,
                    name: 'Succulent Garden',
                    description: 'A collection of beautiful succulents in a decorative pot. These hardy plants bring a touch of nature with minimal maintenance.',
                    price: 34.99,
                    image: flower6,
                    category: 'plants',
                    details: [
                        'Contains 4-6 different succulent varieties',
                        'Planted in a stylish ceramic pot',
                        'Very low maintenance',
                        'Perfect for home or office environments'
                    ]
                }
            }[id];

            setProduct(productData || null);
            setLoading(false);
        }, 500);
    }, [id]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0) {
            setQuantity(value);
        }
    };

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
                <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
                <Link to="/shop" className="btn-primary">
                    Return to Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    <div className="md:w-1/2 p-8">
                        <div className="mb-4">
                            <Link to="/shop" className="text-pink-500 hover:text-pink-700 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                Back to Shop
                            </Link>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                        <p className="text-2xl text-pink-500 font-bold mb-6">${product.price.toFixed(2)}</p>

                        <p className="text-gray-600 mb-6">{product.description}</p>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Details:</h3>
                            <ul className="list-disc pl-5 text-gray-600">
                                {product.details.map((detail, index) => (
                                    <li key={index} className="mb-1">{detail}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-8">
                            <label htmlFor="quantity" className="block text-gray-700 mb-2">Quantity:</label>
                            <div className="flex">
                                <button
                                    onClick={decrementQuantity}
                                    className="bg-gray-200 text-gray-700 px-3 py-2 rounded-l-md hover:bg-gray-300"
                                >
                                    -
                                </button>
                                <input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    className="w-16 text-center border-t border-b border-gray-300 py-2"
                                />
                                <button
                                    onClick={incrementQuantity}
                                    className="bg-gray-200 text-gray-700 px-3 py-2 rounded-r-md hover:bg-gray-300"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button className="btn-primary w-full mb-4">
                            Add to Cart
                        </button>

                        <button className="w-full border border-pink-500 text-pink-500 font-bold py-2 px-4 rounded hover:bg-pink-50 transition-colors">
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">You May Also Like</h2>
                {/* Related products would go here */}
            </div>
        </div>
    );
}

export default ProductDetail;
