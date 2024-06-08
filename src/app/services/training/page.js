// pages/dog-training.js
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDog, FaMapMarkerAlt, FaFilter } from 'react-icons/fa';
import Image from 'next/image';

const DogTrainingPage = () => {
    const [dogTrainers, setDogTrainers] = useState([]);
    const [filteredTrainers, setFilteredTrainers] = useState([]);
    const [city, setCity] = useState('');

    // Mock data for demonstration
    useEffect(() => {
        const mockData = [
            { id: 1, name: 'Pawsitive Pooch Academy', description: 'Professional dog training services with certified trainers.', city: 'New York', image: 'https://via.placeholder.com/300' },
            { id: 2, name: 'K9 Masterminds', description: 'Unlock your dog\'s full potential with our expert trainers.', city: 'Los Angeles', image: 'https://via.placeholder.com/300' },
            { id: 3, name: 'Top Dog Training Institute', description: 'Tailored training programs to suit your dog\'s unique needs.', city: 'Chicago', image: 'https://via.placeholder.com/300' },
        ];
        setDogTrainers(mockData);
        setFilteredTrainers(mockData);
    }, []);

    useEffect(() => {
        if (city === '') {
            setFilteredTrainers(dogTrainers);
        } else {
            setFilteredTrainers(dogTrainers.filter(trainer => trainer.city.toLowerCase().includes(city.toLowerCase())));
        }
    }, [city, dogTrainers]);

    const handleFilterChange = (event) => {
        setCity(event.target.value);
    };

    return (
        <div className="bg-gray-800 min-h-screen p-8 text-white">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center py-7">
                <div className="w-full lg:w-1/2 px-4 lg:pr-8 flex flex-col justify-center -mt-2">
                    <h1 className="md:text-5xl text-3xl mb-4 tracking-tight font-extrabold text-blue-300">Find Dog Trainers Nearby</h1>
                    <p className="md:text-lg text-sm text-gray-300 tracking-tight max-w-[500px]">
                        Discover certified dog trainers who can help with obedience, behavior, and agility training. Whether you have a new puppy or an older dog, find the perfect trainer for your pet&apos;s needs.
                        We believe in the power of positive reinforcement training methods to build a strong bond between you and your furry friend.
                    </p>
                </div>
                <div className="w-full lg:w-1/2 px-4 flex justify-center">
                    <Image src="/dog-training-page.jpg" alt="Dog Training Image" className="rounded-lg shadow-md m-8 w-11/12 object-cover md:max-w-full md:h-auto" width={400} height={400} style={{ maxWidth: '400px' }} />
                </div>
                <div className="w-full mt-8">
                    <h2 className="md:text-4xl text-2xl font-bold text-center tracking-tight mb-4 mt-10">Explore Training Centers</h2>
                    <div className="flex justify-center my-8">
                        <label htmlFor="city" className="mr-2 md:text-lg text-md font-medium text-gray-300 md:mt-1 mt-2"><FaFilter className="inline-block mr-1" />Filter by City:</label>
                        <input
                            type="text"
                            id="city"
                            value={city}
                            onChange={handleFilterChange}
                            placeholder="Enter city name"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                        {filteredTrainers.map(trainer => (
                            <div key={trainer.id} className="bg-white p-6 rounded-lg shadow-md transform transition hover:scale-105 hover:shadow-lg">
                                <img src={trainer.image} alt={trainer.name} className="w-full h-44 object-cover rounded-lg mb-4" />
                                <h3 className="md:text-xl text-lg font-semibold text-gray-900 mb-2"><FaDog className="inline-block mr-1" />{trainer.name}</h3>
                                <p className="text-gray-700 mb-4">{trainer.description}</p>
                                <p className="text-gray-900 font-medium"><FaMapMarkerAlt className="inline-block mr-1" /><strong>City:</strong> {trainer.city}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-12 text-center">
                <div className="bg-gray-600 p-8 rounded-lg border-2 shadow-lg inline-block max-w-md">
                    <h2 className="text-xl md:text-2xl text-blue-400 font-semibold mb-4 tracking-tighter">Are You a Dog Trainer?</h2>
                    <p className="text-sm md:text-[16px] mb-6">Join our network and reach more pet owners looking for professional dog training services. Register now to expand your client base and help more dogs reach their full potential.</p>
                    <a href="/register-training" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition tracking-tighter">Register for Dog Trainer</a>
                </div>
            </div>
        </div>
    );
};

export default DogTrainingPage;
