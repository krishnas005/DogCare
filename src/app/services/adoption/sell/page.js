// components/Adoption/SellDog.js
"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from 'zod';

const dogSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    breed: z.string().min(1, 'Breed is required'),
    age: z.number().min(0, 'Age must be a positive number'),
    price: z.number().min(0, 'Price must be a positive number'),
});

const SellDog = () => {
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        age: '',
        price: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const validationResult = dogSchema.safeParse(formData);
            // if (!validationResult.success) {
            //     throw new Error(validationResult.error.errors[0].message);
            // }

            const response = await axios.post('/api/dogs-for-adoption/sell', formData);
            toast.success('Dog added for adoption successfully');
            // Clear form data
            setFormData({ name: '', breed: '', age: '', price: '' });
        } catch (error) {
            console.error('Error adding dog for adoption:', error.message);
            toast.error(error.message);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Adoption - Sell a Dog</h1>
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">Add Dog for Adoption</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Breed</label>
                        <input
                            type="text"
                            name="breed"
                            value={formData.breed}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600"
                    >
                        Add Dog
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SellDog;
