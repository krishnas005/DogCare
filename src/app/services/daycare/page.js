// pages/daycare.js
"use client";

import React, { useState, useEffect } from 'react';
import { FaFilter, FaPaw, FaMapMarkerAlt, FaPlus, FaTimes, FaCopy } from 'react-icons/fa';
import Image from 'next/image';

const DaycarePage = () => {
    const [daycareServices, setDaycareServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [city, setCity] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const mockData = [
            { id: 1, name: 'Happy Paws', description: 'A great place for your pet to stay during the day.', city: 'New York', image: 'https://via.placeholder.com/300' },
            { id: 2, name: 'Pawtastic Daycare', description: 'Quality care for your beloved pets.', city: 'Los Angeles', image: 'https://via.placeholder.com/300' },
            { id: 3, name: 'Pet Haven', description: 'Safe and fun environment for pets.', city: 'Chicago', image: 'https://via.placeholder.com/300' },
        ];
        setDaycareServices(mockData);
        setFilteredServices(mockData);
    }, []);

    useEffect(() => {
        if (city === '') {
            setFilteredServices(daycareServices);
        } else {
            setFilteredServices(daycareServices.filter(service => service.city.toLowerCase().includes(city.toLowerCase())));
        }
    }, [city, daycareServices]);

    const handleFilterChange = (event) => {
        setCity(event.target.value);
    };

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCopyEmail = () => {
        const emailText = "info@daycare.com";
        navigator.clipboard.writeText(emailText);
        alert("Email address copied to clipboard!");
    };

    return (
        <div className="bg-gray-800 min-h-screen p-8 text-white">
            <div className="max-w-7xl mx-auto text-center py-7">
                <h1 className="text-4xl font-bold text-blue-400 mb-8">Daycare Services for Your Pet</h1>
                <p className="mb-12 max-w-2xl mx-auto text-lg text-gray-300">
                    Discover the best daycare services for your beloved pets. Our trusted partners provide safe, fun, and nurturing environments to ensure your pet has a great time while you&apos;re away.
                </p>
                <div className="flex justify-center mb-6">
                    <label htmlFor="city" className="mr-2 text-lg font-medium text-gray-300 mt-1">
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
                    {filteredServices.map(service => (
                        <div key={service.id} className="bg-white p-6 rounded-lg shadow-md transform transition hover:scale-105 hover:shadow-lg">
                            <img src={service.image} alt={service.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2"><FaPaw className="inline-block mr-1" /> {service.name}</h2>
                            <p className="text-gray-700 mb-4">{service.description}</p>
                            <p className="text-gray-900 font-medium"><FaMapMarkerAlt className="inline-block mr-1" /> <strong>City:</strong> {service.city}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-12">
                    <button onClick={handleModalToggle} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                        <FaPlus className="inline-block mr-1" /> Register for Daycare Services
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto text-gray-800">
                        <div className="flex justify-end">
                            <button onClick={handleModalToggle} className="text-gray-500 hover:text-gray-700">
                                <FaTimes />
                            </button>
                        </div>
                        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-500">Register Your Daycare Service</h2>
                        <p className="text-lg mb-6 text-center">
                            To register your daycare service, please send the following information to our email address:
                        </p>
                        <ul className="list-disc list-inside mb-6 text-left">
                            <li className="mb-2">Name</li>
                            <li className="mb-2">Email</li>
                            <li className="mb-2">Phone</li>
                            <li className="mb-2">City</li>
                            <li className="mb-2">Description of your daycare service</li>
                            <li className="mb-2">Pictures of your facility</li>
                            <li>List of available equipment and amenities</li>
                        </ul>
                        <div className="flex justify-center items-center mb-4">
                            <span className="text-gray-700 text-lg">Email:</span>
                            <button onClick={handleCopyEmail} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center">
                                info@daycare.com <FaCopy className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DaycarePage;
