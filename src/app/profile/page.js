"use client";

import React, { useContext } from 'react';
import { GlobalContext } from '@/context';

const ProfilePage = () => {
    const { user, pet } = useContext(GlobalContext);

    if (!user || !pet) {
        return <div>Loading...</div>;
    }

    const { name, email, city, state, country, phone } = user;
    const { name: petName, breed, age, gender, image } = pet[0];

    return (
        <div className="bg-gray-800 min-h-screen p-8">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center my-3">User Profile</h1>
                <div className="flex items-center mb-6">
                    <img
                        src="/default-profile.jpg"
                        alt="User Profile Picture"
                        className="w-24 h-24 rounded-full mr-4"
                    />
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
                        <p className="text-gray-700">{email}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact Information</h3>
                        <p className="text-gray-700">Phone: {phone}</p>
                        <p className="text-gray-700">City: {city}</p>
                        <p className="text-gray-700">State: {state}</p>
                        <p className="text-gray-700">Country: {country}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Pet Information</h3>
                        <div className="flex items-center mb-4">
                            <img
                                src={image || "/dogPic.jpg"}
                                alt={petName}
                                className="w-16 h-16 rounded-full mr-4"
                            />
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900">{petName}</h4>
                                <p className="text-gray-700">Breed: {breed}</p>
                                <p className="text-gray-700">Age: {age}</p>
                                <p className="text-gray-700">Gender: {gender}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
