"use client";
import React from 'react';

export default function PetCare() {
    return (
        <div className="bg-gray-800 py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center gap-10">
                <div className="flex-1 text-white">
                    <h2 className="text-4xl font-bold text-white mb-6 text-center sm:text-left">Basic Pet Care Tips</h2>
                    <p className="text-lg text-gray-200 mb-4">
                        Learn the basics of pet care, including the importance of vaccinations, regular check-ups, and proper nutrition.
                    </p>
                    <p className="text-lg text-gray-200">
                        Proper pet care is essential for the health and well-being of your furry friend. Make sure to stay informed and provide the best care possible.
                    </p>
                </div>
                <div className="flex-1 mt-6 sm:mt-0 w-full flex justify-center">
                    <div className="relative pb-[56.25%] w-full h-0 overflow-hidden rounded-lg shadow-lg">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/wAHbwu2nXMs"
                            title="Pet Care Tips"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}
