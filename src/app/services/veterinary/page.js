"use client";

import React, { useState, useEffect } from 'react';
import { FaStethoscope, FaMapMarkerAlt, FaFilter, FaPlus, FaTimes, FaCopy, FaPhone } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default function VeterinaryPage() {
    const [vets, setVets] = useState([]);
    const [filteredVets, setFilteredVets] = useState([]);
    const [city, setCity] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        const vetData = [
            { id: 1, name: 'Dr. Anil Kumar Mathur', specialty: 'General Veterinary & Surgery', city: 'Meerut', address: 'Opp Defence Colony, Mawana Road, Meerut - 250001', contact: '+91 9876543210', image: 'https://via.placeholder.com/300' },
            { id: 2, name: 'Dr. Rajeev Dog Clinic', specialty: 'Pet Surgery & Treatment', city: 'Muzaffarnagar', address: 'Near Gandhi Colony, Muzaffarnagar - 251001', contact: '+91 9988776655', image: 'https://via.placeholder.com/300' },
            { id: 3, name: 'Dr. Neha Sharma Pet Clinic', specialty: 'Dermatology & Vaccination', city: 'Saharanpur', address: 'Court Road, Near Central Market, Saharanpur - 247001', contact: '+91 9898989898', image: 'https://via.placeholder.com/300' },
            { id: 4, name: 'Dr. Ramesh Verma', specialty: 'Orthopedics & Physiotherapy', city: 'Delhi', address: 'Sector 12, Dwarka, Delhi - 110075', contact: '+91 9123456789', image: 'https://via.placeholder.com/300' },
            { id: 5, name: 'Dr. Kavita Malhotra', specialty: 'Emergency & Critical Care', city: 'Noida', address: 'Block C, Sector 62, Noida - 201301', contact: '+91 8765432109', image: 'https://via.placeholder.com/300' }
        ];
        setVets(vetData);
        setFilteredVets(vetData);
    }, []);

    useEffect(() => {
        if (city === '') {
            setFilteredVets(vets);
        } else {
            setFilteredVets(vets.filter(vet => vet.city.toLowerCase().includes(city.toLowerCase())));
        }
    }, [city, vets]);

    const handleFilterChange = (event) => {
        setCity(event.target.value);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setIsCopied(false);
    };

    const copyEmailToClipboard = () => {
        navigator.clipboard.writeText('register@veterinarynetwork.com').then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        });
    };

    return (
        <div className="bg-gray-800 min-h-screen p-8 text-white">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-blue-300 mb-8">Find a Trusted Veterinary Doctor</h1>
                <div className="flex justify-center mb-8">
                    <label htmlFor="city" className="mr-2 text-lg font-medium text-gray-300">
                        <FaFilter className="inline-block mr-1" /> Filter by City:
                    </label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={handleFilterChange}
                        placeholder="Enter city name"
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredVets.map(vet => (
                       <div key={vet.id} className="bg-white p-6 rounded-lg shadow-md transform transition hover:scale-105 hover:shadow-lg">
                       <img src={vet.image} alt={vet.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                       <h3 className="text-xl font-semibold text-gray-900 mb-2">
                           <FaStethoscope className="inline-block mr-1" /> {vet.name}
                       </h3>
                       <p className="text-gray-700 mb-2"><strong>Specialty:</strong> {vet.specialty}</p>
                       <p className="text-gray-900 font-medium"><FaMapMarkerAlt className="inline-block mr-1" /> <strong>City:</strong> {vet.city}</p>
                       <p className="text-gray-900 font-medium"><strong>Address:</strong> {vet.address}</p>
                       <p className="text-gray-900 font-medium"><FaPhone className="inline-block mr-1" /> <strong>Contact:</strong> {vet.contact}</p>
                   </div>
                    ))}
                </div>
            </div>
            <div className="mt-12 text-center">
                <button onClick={toggleModal} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    <FaPlus className="inline-block mr-1" /> Register as a Veterinarian
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto text-gray-800">
                        <div className="flex justify-end">
                            <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700">
                                <FaTimes />
                            </button>
                        </div>
                        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-500">Register as a Veterinarian</h2>
                        <p className="text-lg mb-6 text-center">
                            To join our network, please send your details to our email address:
                        </p>
                        <div className="flex justify-center items-center mb-4">
                            <span className="text-gray-700 text-lg">Email:</span>
                            <button onClick={copyEmailToClipboard} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center">
                                register@veterinarynetwork.com <FaCopy className="ml-2" />
                            </button>
                        </div>
                        {isCopied && <p className="text-black text-sm mt-2">Email address copied to clipboard!</p>}
                    </div>
                </div>
            )}
        </div>
    );
};
