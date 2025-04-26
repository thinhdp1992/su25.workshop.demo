function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Flower Shop</h3>
                        <p className="text-gray-300">
                            Beautiful flowers for every occasion. We deliver fresh flowers to make your special moments memorable.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-300 hover:text-pink-400 transition-colors">Home</a></li>
                            <li><a href="/shop" className="text-gray-300 hover:text-pink-400 transition-colors">Shop</a></li>
                            <li><a href="/image-generator" className="text-gray-300 hover:text-pink-400 transition-colors">Image Generator</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                        <p className="text-gray-300 mb-2">Email: info@flowershop.com</p>
                        <p className="text-gray-300 mb-2">Phone: +1 (123) 456-7890</p>
                        <p className="text-gray-300">Address: 123 Flower Street, Garden City</p>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center">
                    <p className="text-gray-400">© {new Date().getFullYear()} Flower Shop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
