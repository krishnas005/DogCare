"use client";

import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { GlobalContext } from '@/context';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
    const { user, pet } = useContext(GlobalContext);
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, setValue } = useForm();

    if (!user || !pet) {
        return <div className="flex justify-center items-center mt-16">
            <div className="loader"></div>
        </div>;
    }

    const { name, email, city, state, country, phone } = user;
    const { name: petName, breed, age, gender, image } = pet[0];

    const handleEditClick = () => {
        setIsEditing(!isEditing);
        // Prefill user details
        setValue('name', name);
        setValue('email', email);
        setValue('city', city);
        setValue('state', state);
        setValue('country', country);
        setValue('phone', phone);
        // Prefill pet details
        setValue('petName', petName);
        setValue('breed', breed);
        setValue('age', age);
        setValue('gender', gender);
    };

    const onSubmit = async (data) => {
        try {
            const token = Cookies.get('token');
            const response = await axios.put('/api/users/updateUser', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setIsEditing(false);
                toast.success('Profile updated successfully!', {
                    // position: toast.POSITION.TOP_RIGHT,
                });
            } else {
                toast.error('Failed to update profile.', {
                    // position: toast.POSITION.TOP_RIGHT,
                });
                console.error('Failed to update user and pet details');
            }
        } catch (error) {
            toast.error('An error occurred while updating the profile.', {
                // position: toast.POSITION.TOP_RIGHT,
            });
            console.error('Failed to update user and pet details', error);
        }
    };

    return (
        <div className="bg-gray-800 min-h-screen p-8">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center my-3">User Profile</h1>
                <div className="flex items-center mb-6">
                    {/* <img
                        src="/default-profile.jpg"
                        alt="User Profile Picture"
                        className="w-24 h-24 rounded-full mr-4"
                    /> */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
                        <p className="text-gray-700">{email}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
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
                <button 
                    onClick={handleEditClick} 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                    Edit Profile
                </button>
                {isEditing && (
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* User Details */}
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700">Name</label>
                                <input 
                                    id="name" 
                                    {...register('name')} 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700">Email</label>
                                <input 
                                    id="email" 
                                    {...register('email')} 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-gray-700">Phone</label>
                                <input 
                                    id="phone" 
                                    {...register('phone')} 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="city" className="block text-gray-700">City</label>
                                <input 
                                    id="city" 
                                    {...register('city')} 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="state" className="block text-gray-700">State</label>
                                <input 
                                    id="state" 
                                    {...register('state')} 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="country" className="block text-gray-700">Country</label>
                                <input 
                                    id="country" 
                                    {...register('country')} 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            {/* Pet Details */}
                            <div className="mb-4">
                                <label htmlFor="petName" className="block text-gray-700">Pet Name</label>
                                <input 
                                    id="petName" 
                                    {...register('petName')} 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="breed" className="block text-gray-700">Pet Breed</label>
                                <input 
                                    id="breed" 
                                    {...register('breed')} 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="age" className="block text-gray-700">Pet Age</label>
                                <input 
                                    id="age" 
                                    {...register('age')} 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="gender" className="block text-gray-700">Pet Gender</label>
                                <input 
                                    id="gender" 
                                    {...register('gender')} 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            className="bg-green-500 text-white px-4 py-2 mt-4 w-full text-center rounded hover:bg-green-600 transition duration-200">
                            Update Profile
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
