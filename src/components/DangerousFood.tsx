import React from 'react';
import Link from 'next/link';

const DangerousFood = () => {
    return (
        <div className="bg-gray-800 min-h-screen flex items-center justify-center overflow-hidden">
            <div className="bg-white p-12 rounded-lg shadow-lg max-w-2xl w-full">
                <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6 tracking-tight">Dangerous and unsuitable foods</h1>
                <p className="text-lg text-gray-800 mb-4 line-clamp">
                    Some foods that are safe for humans can be toxic for dogs and could even be fatal. Never give your dog:
                </p>
                <ul className="list-disc list-inside text-lg text-gray-800 space-y-2">
                    <li>Chocolate</li>
                    <li>Caffeine</li>
                    <li>Grapes and raisins</li>
                    <li>Onions, garlic, leeks, scallions, chives, or shallots</li>
                    <li>Alcohol</li>
                    <li>Macadamia nuts</li>
                    <li>Food containing xylitol - an artificial sweetener (E967)</li>
                </ul>
                <div className="mt-4 ml-4">For more details <Link href="https://www.aspca.org/pet-care/animal-poison-control/people-foods-avoid-feeding-your-pets" className="text-blue-400 ">read</Link> </div>
            </div>
        </div>
    );
};

export default DangerousFood;
