import { useState } from 'react';
import ImageGeneratorComponent from '../components/ImageGenerator';

function ImageGenerator() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Flower Image Generator</h1>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Create custom flower images with our AI-powered generator. Describe the flowers you want to see, and our system will create a unique image for you.
            </p>

            <ImageGeneratorComponent />

            <div className="mt-16 bg-pink-50 rounded-lg p-8 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-pink-500 text-3xl font-bold mb-3">1</div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Describe Your Flowers</h3>
                        <p className="text-gray-600">
                            Enter a detailed description of the flowers, colors, arrangement, and style you want to see.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-pink-500 text-3xl font-bold mb-3">2</div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Generate Image</h3>
                        <p className="text-gray-600">
                            Our AI system processes your description and creates a unique flower image based on your input.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-pink-500 text-3xl font-bold mb-3">3</div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Save or Order</h3>
                        <p className="text-gray-600">
                            Download your image or contact us to create a real arrangement inspired by your generated image.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageGenerator;
