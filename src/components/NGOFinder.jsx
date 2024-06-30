"use client";
import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';
// import ngos from '../assets/ngos.json'

const ngos = [
    { city: 'New York', name: 'Paws for a Cause', contact: 'paws@example.com', phone: '+1234567890', address: '123 Main Street, New York' },
    { city: 'New York', name: 'Stray Rescuers', contact: 'rescuers@example.com', phone: '+1987654321', address: '456 Elm Street, New York' },
    { city: 'Los Angeles', name: 'Stray Angels', contact: 'angels@example.com', phone: '+1122334455', address: '789 Oak Avenue, Los Angeles' },
];

export default function NGOFinder() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedNGO, setSelectedNGO] = useState(null);

    const handleSearch = () => {
        const results = ngos.filter(ngo => ngo.city.toLowerCase().includes(searchQuery.toLowerCase()));
        setSearchResults(results);
        setShowResults(true);
    };

    const handleCopyDetails = (details) => {
        navigator.clipboard.writeText(details);
    };

    const handleCloseResults = () => {
        setShowResults(false);
    };

    const handleShowDetails = (ngo) => {
        setSelectedNGO(ngo);
    };

    const handleCloseDetails = () => {
        setSelectedNGO(null);
    };

    return (
        <div className="bg-gray-800 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border border-gray-300 rounded-lg p-6 bg-gray-900 shadow-lg">
                    <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center md:mt-10">Find NGOs for Stray Dogs</h2>
                    <div className="flex items-center justify-center mb-10">
                        <input
                            type="text"
                            className="border border-gray-300 rounded-md p-2 mr-2 w-full sm:w-auto"
                            placeholder="Enter your city"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                    {showResults && (
                        <div className="bg-white rounded-lg shadow-lg p-4 mt-4">
                            {searchResults.length > 0 ? (
                                <ul className="divide-y divide-gray-200">
                                    {searchResults.map((ngo, index) => (
                                        <li key={index} className="py-2 flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold mb-1">{ngo.name}</h3>
                                                <p className="text-sm text-gray-600">{ngo.address}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
                                                    onClick={() => handleShowDetails(ngo)}
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600 text-sm">No results found.</p>
                            )}
                            <button
                                className="text-gray-600 hover:text-gray-800 focus:outline-none mt-4"
                                onClick={handleCloseResults}
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {selectedNGO && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
                        <h3 className="text-lg font-semibold mb-2">{selectedNGO.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{selectedNGO.address}</p>
                        <div className="flex items-center mb-2">
                            <span className="text-sm text-gray-600">{selectedNGO.phone}</span>
                            <button
                                className="text-gray-600 hover:text-gray-800 focus:outline-none ml-2"
                                onClick={() => handleCopyDetails(selectedNGO.phone)}
                            >
                                <FaCopy />
                            </button>
                        </div>
                        <div className="flex items-center mb-4">
                            <span className="text-sm text-gray-600">{selectedNGO.contact}</span>
                            <button
                                className="text-gray-600 hover:text-gray-800 focus:outline-none ml-2"
                                onClick={() => handleCopyDetails(selectedNGO.contact)}
                            >
                                <FaCopy />
                            </button>
                        </div>
                        <button
                            className="text-red-600 hover:text-red-800 text-bold focus:outline-none absolute top-3 right-4 "
                            onClick={handleCloseDetails}
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
