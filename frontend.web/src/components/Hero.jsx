function Hero() {
    return (
        <div className="relative bg-pink-100">
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Beautiful Flowers for Every Occasion
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Discover our collection of fresh, handpicked flowers perfect for any moment. From elegant roses to exotic orchids.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <a href="/shop" className="btn-primary text-center">
                            Shop Now
                        </a>
                        <a href="#featured" className="btn-secondary text-center">
                            View Featured
                        </a>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="hidden md:block absolute bottom-0 right-0 w-1/3 h-full">
                <div className="absolute bottom-0 right-0 w-full h-full bg-pink-200 opacity-50 transform -rotate-6 origin-bottom-right"></div>
                <div className="absolute bottom-0 right-0 w-full h-full bg-pink-300 opacity-30 transform -rotate-12 origin-bottom-right"></div>
            </div>
        </div>
    );
}

export default Hero;
