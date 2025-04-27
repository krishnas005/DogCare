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
            {
                id: 1,
                name: 'Artemis Pet Clinic & Surgical Centre',
                description: 'Comprehensive pet care services including daycare and medical facilities.',
                city: 'Meerut',
                address: '139, RA Bazar, Meerut Cantt, Meerut, Uttar Pradesh 250001, India',
                contact: '+91 9876543210',
                image: 'https://example.com/artemis.jpg',
            },
            {
                id: 2,
                name: 'Anuj Pet Shop',
                description: 'Pet shop offering boarding services for your beloved pets.',
                city: 'Muzaffarnagar',
                address: 'Street No. 17, Subhash Nagar, Gandhi Colony, Muzaffarnagar',
                contact: '+91 8765432109',
                image: 'https://example.com/anujpetshop.jpg',
            },
            {
                id: 3,
                name: 'Happy Paws Pet Boarding',
                description: 'Safe and friendly pet boarding with round-the-clock care.',
                city: 'Saharanpur',
                address: 'Near Civil Hospital, Saharanpur, Uttar Pradesh',
                contact: '+91 7654321098',
                image: 'https://example.com/happypaws.jpg',
            },
            {
                id: 4,
                name: 'Royal Pet Clinic',
                description: 'Clinic offering pet boarding and healthcare services.',
                city: 'Meerut',
                address: 'Fortune Vardhaman Plaza, Near Delhi Public School, Bhaghpat Road, Meerut',
                contact: '+91 6543210987',
                image: 'https://example.com/royalpet.jpg',
            }
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
                    Discover the best daycare services for your beloved pets. Our trusted partners provide safe, fun, and nurturing environments.
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
                            <p className="text-gray-900 font-medium"><strong>Address:</strong> {service.address}</p>
                            <p className="text-gray-900 font-medium"><strong>Contact:</strong> {service.contact}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DaycarePage;