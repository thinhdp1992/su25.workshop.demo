import { Link } from 'react-router-dom';

function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <Link to={`/product/${product.id}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                />
            </Link>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-pink-500 font-bold">${product.price.toFixed(2)}</span>
                    <button className="btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
