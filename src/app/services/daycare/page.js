// pages/daycare.js
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DaycarePage = () => {
    const [daycareServices, setDaycareServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [city, setCity] = useState('');

    // Uncomment and configure this if you have an API endpoint
    // useEffect(() => {
    //     const fetchDaycareServices = async () => {
    //         try {
    //             const response = await axios.get('/api/daycare-services');
    //             setDaycareServices(response.data);
    //             setFilteredServices(response.data);
    //         } catch (error) {
    //             console.error('Error fetching daycare services:', error);
    //         }
    //     };
    //     fetchDaycareServices();
    // }, []);

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

    return (
        <div className="bg-gray-800 min-h-screen p-8 text-white">
            <h1 className="text-4xl font-bold text-center text-blue-400 mb-8">Daycare Services for Your Pet</h1>
            <p className="text-center mb-12 max-w-2xl mx-auto text-lg text-gray-300">
                Discover the best daycare services for your beloved pets. Our trusted partners provide safe, fun, and nurturing environments to ensure your pet has a great time while you&apos;re away.
            </p>
            <div className="flex justify-center mb-6">
                <label htmlFor="city" className="mr-2 text-lg font-medium text-gray-300 mt-1">Filter by City:</label>
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
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{service.name}</h2>
                        <p className="text-gray-700 mb-4">{service.description}</p>
                        <p className="text-gray-900 font-medium"><strong>City:</strong> {service.city}</p>
                    </div>
                ))}
            </div>
            <div className="mt-12 text-center">
                <a href="/register-daycare" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Register for Daycare Services</a>
            </div>
        </div>
    );
};

export default DaycarePage;
