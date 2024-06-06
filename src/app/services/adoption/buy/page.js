"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image'; // Assuming you're using Next.js for image optimization

const BuyDog = () => {
    const [dogsForAdoption, setDogsForAdoption] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadDogsForAdoption = async () => {
        try {
            const response = await axios.get('/api/dogs-for-adoption/buy');
            setDogsForAdoption(response.data);
            // toast.success('Pets fetched successfully!');
        } catch (error) {
            console.error('Error fetching dogs for adoption(page):', error);
            toast.error('Error fetching dogs for adoption');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDogsForAdoption();
    }, []);

    const handleBuyDog = async (dogId) => {
        try {
            const response = await axios.post(`/api/dogs-for-adoption/buy-dog?id=${dogId}`);
            if (response.status === 200) {
                toast.success('Dog bought successfully');
                // Reload dogs for adoption
                loadDogsForAdoption();
            } else {
                toast.error(response.data.error || 'Error buying dog');
            }
        } catch (error) {
            console.error('Error buying dog:', error);
            toast.error('Error buying dog');
        }
    };

    return (
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-8">Adopt a Dog</h1>
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="loader"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dogsForAdoption.map((dog) => (
                        <div key={dog.id} className="bg-white rounded-lg shadow-md p-6">
                            <Image
                                src={dog.image || '/dogPic1.jpg'}
                                alt={dog.name}
                                width={200}
                                height={200}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-2xl font-semibold mb-2">{dog.name}</h2>
                            <p className="text-gray-600 mb-2">Breed: {dog.breed}</p>
                            <p className="text-gray-600 mb-2">Age: {dog.age} years</p>
                            <p className="text-gray-800 font-bold mb-4">Price: Rs.{dog.price}</p>
                            <button
                                className="w-full bg-green-500 text-white px-3 py-2 rounded-md shadow hover:bg-green-600 transition duration-300"
                                onClick={() => handleBuyDog(dog._id)}
                            >
                                Buy
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default BuyDog;
