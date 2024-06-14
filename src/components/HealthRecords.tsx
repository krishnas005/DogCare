"use client";
import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { GlobalContext } from '@/context';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HealthRecords = ({ petId }) => {
    const { register, handleSubmit, reset } = useForm();
    const [healthRecords, setHealthRecords] = useState([]);
    const [healthAlerts, setHealthAlerts] = useState([]);
    const { user } = useContext(GlobalContext);

    useEffect(() => {
        fetchHealthData();
    }, []);

    const fetchHealthData = async () => {
        try {
            const response = await axios.get(`/api/pet-health?id=${petId}`);
            setHealthRecords(response.data.healthRecords);
        } catch (error) {
            console.error('Failed to fetch health records', error);
        }

        try {
            const response = await axios.get(`/api/pet-health-alert?id=${petId}`);
            setHealthAlerts(response.data.healthAlerts);
        } catch (error) {
            console.error('Failed to fetch health alerts', error);
        }
    };

    const onSubmitHealthRecord = async (data) => {
        try {
            const response = await axios.put(`/api/pet-health?id=${petId}`, data);

            if (response.status === 200) {
                toast.success('Health record added/updated successfully!', {
                    // position: toast.POSITION.TOP_RIGHT,
                });
                fetchHealthData();
                reset(); // Reset form after submission
            } else {
                toast.error('Failed to update health record.', {
                    // position: toast.POSITION.TOP_RIGHT,
                });
                console.error('Failed to update health record');
            }
        } catch (error) {
            toast.error('An error occurred while updating health record.', {
                // position: toast.POSITION.TOP_RIGHT,
            });
            console.error('Failed to update health record', error);
        }
    };

    const onSubmitHealthAlert = async (data) => {
        try {
            const response = await axios.put(`/api/pet-health-alert?id=${petId}`, data);

            if (response.status === 200) {
                toast.success('Health alert added/updated successfully!', {
                    // position: toast.POSITION.TOP_RIGHT,
                });
                fetchHealthData();
                reset(); // Reset form after submission
            } else {
                toast.error('Failed to update health alert.', {
                    // position: toast.POSITION.TOP_RIGHT,
                });
                console.error('Failed to update health alert');
            }
        } catch (error) {
            toast.error('An error occurred while updating health alert.', {
                // position: toast.POSITION.TOP_RIGHT,
            });
            console.error('Failed to update health alert', error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <ToastContainer />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Health Records</h2>
            <form onSubmit={handleSubmit(onSubmitHealthRecord)} className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="mb-4">
                        <label htmlFor="type" className="block text-gray-700">Type</label>
                        <input 
                            id="type" 
                            {...register('type')} 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-700">Date</label>
                        <input 
                            type="date"
                            id="date" 
                            {...register('date')} 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700">Description</label>
                        <input 
                            id="description" 
                            {...register('description')} 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="vet" className="block text-gray-700">Vet</label>
                        <input 
                            id="vet" 
                            {...register('vet')} 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                </div>
                <button 
                    type="submit" 
                    className="bg-green-500 text-white px-4 py-2 mt-4 w-full text-center rounded hover:bg-green-600 transition duration-200">
                    Add/Update Health Record
                </button>
            </form>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Health Alerts</h2>
            <form onSubmit={handleSubmit(onSubmitHealthAlert)} className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="mb-4">
                        <label htmlFor="alertType" className="block text-gray-700">Type</label>
                        <input 
                            id="alertType" 
                            {...register('alertType')} 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="alertDate" className="block text-gray-700">Date</label>
                        <input 
                            type="date"
                            id="alertDate" 
                            {...register('alertDate')} 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="alertDescription" className="block text-gray-700">Description</label>
                        <input 
                            id="alertDescription" 
                            {...register('alertDescription')} 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                </div>
                <button 
                    type="submit" 
                    className="bg-green-500 text-white px-4 py-2 mt-4 w-full text-center rounded hover:bg-green-600 transition duration-200">
                    Add/Update Health Alert
                </button>
            </form>

            <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-900">Existing Health Records</h2>
                {healthRecords.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {healthRecords.map(record => (
                            <li key={record._id} className="py-4">
                                <div className="flex space-x-3">
                                    <div className="flex-1 space-y-1">
                                        <p className="text-gray-900 text-lg font-semibold">{record.type}</p>
                                        <p className="text-gray-600">{record.date}</p>
                                        <p className="text-gray-600">{record.description}</p>
                                        <p className="text-gray-600">Vet: {record.vet}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-700">No health records found.</p>
                )}
            </div>

            <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-900">Existing Health Alerts</h2>
                {healthAlerts.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {healthAlerts.map(alert => (
                            <li key={alert._id} className="py-4">
                                <div className="flex space-x-3">
                                    <div className="flex-1 space-y-1">
                                        <p className="text-gray-900 text-lg font-semibold">{alert.type}</p>
                                        <p className="text-gray-600">{alert.date}</p>
                                        <p className="text-gray-600">{alert.description}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-700">No health alerts found.</p>
                )}
            </div>
        </div>
    );
};

export default HealthRecords;