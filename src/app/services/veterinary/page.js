// pages/veterinary.js
"use client";

import React, { useState, useEffect } from 'react';
import { FaStethoscope, FaMapMarkerAlt, FaFilter, FaPlus } from 'react-icons/fa';
import Link from 'next/link';

export default function VeterinaryPage() {
    const [vets, setVets] = useState([]);
    const [filteredVets, setFilteredVets] = useState([]);
    const [city, setCity] = useState('');

    // Mock data for demonstration
    useEffect(() => {
        const mockData = [
            { id: 1, name: 'Dr. John Doe', specialty: 'General Veterinary', city: 'New York', image: 'https://via.placeholder.com/300' },
            { id: 2, name: 'Dr. Jane Smith', specialty: 'Surgery', city: 'Los Angeles', image: 'https://via.placeholder.com/300' },
            { id: 3, name: 'Dr. Emily Johnson', specialty: 'Dermatology', city: 'Chicago', image: 'https://via.placeholder.com/300' },
        ];
        setVets(mockData);
        setFilteredVets(mockData);
    }, []);

    // Filter vets based on city
    useEffect(() => {
        if (city === '') {
            setFilteredVets(vets);
        } else {
            setFilteredVets(vets.filter(vet => vet.city.toLowerCase().includes(city.toLowerCase())));
        }
    }, [city, vets]);

    // Handle city filter input change
    const handleFilterChange = (event) => {
        setCity(event.target.value);
    };

    return (
        <div className="bg-gray-800 min-h-screen p-8 text-white">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center">
                <div className="w-full lg:w-1/2 px-4 lg:pr-8 flex flex-col justify-center md:mt-[110px] mt-4 md:mb-16 mb-6">
                    <h1 className="md:text-5xl text-3xl font-extrabold mb-4 tracking-tighter text-blue-300">Find Veterinary Services Near You</h1>
                    <p className="md:text-lg text-sm text-gray-300 mb-8">
                        Locate top-rated veterinarians in your area. Our directory includes specialists in various fields, ensuring your pet receives the best possible care.
                        Whether you need routine check-ups, emergency care, or specialized treatments, our vetted professionals are here to help.
                    </p>
                </div>
                <div className="w-full lg:w-1/2 px-4 flex justify-center">
                    <img src="/veterinary-header.webp" alt="Veterinary Services" className="rounded-lg border-2 border-gray-500 shadow-md w-11/12 object-cover md:max-w-full md:h-auto" style={{ maxWidth: '400px' }} />
                </div>
            </div>
            <div className="max-w-7xl mx-auto md:mt-[80px] mt-14">
                <h2 className="md:text-4xl text-2xl font-semibold text-center mb-8 tracking-tighter">Our Veterinarians</h2>
                <div className="flex justify-center mb-8">
                    <label htmlFor="city" className="mr-2 md:text-lg text-md font-medium text-gray-300 mt-1"><FaFilter className="inline-block mr-1 " />Filter by City:</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={handleFilterChange}
                        placeholder="Enter city name"
                        className="md:px-4 md:py-2 px-2 py-1 border border-gray-300 rounded-lg text-gray-900"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                    {filteredVets.map(vet => (
                        <div key={vet.id} className="bg-white p-6 rounded-lg shadow-md transform transition hover:scale-105 hover:shadow-lg">
                            <img src={vet.image} alt={vet.name} className="w-full h-44 object-cover rounded-lg mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2"><FaStethoscope className="inline-block mr-1" />{vet.name}</h3>
                            <p className="text-gray-700 mb-2"><strong>Specialty:</strong> {vet.specialty}</p>
                            <p className="text-gray-900 font-medium"><FaMapMarkerAlt className="inline-block mr-1" /><strong>City:</strong> {vet.city}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-16 text-center">
                <div className="bg-gray-600 p-8 rounded-lg border-2 shadow-lg inline-block max-w-lg mx-auto">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 tracking-tighter text-blue-500">Join our Network</h2>
                    <p className="text-md mb-6">Join our network and reach more pet owners looking for professional veterinary services. Register now to expand your client base and help more pets receive the care they deserve.</p>
                    <Link href="/register-veterinary" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition tracking-tighter text-sm">
                            <FaPlus className="inline-block mr-1" /> Register as a Veterinarian
                    </Link>
                </div>
            </div>
        </div>
    );
};
