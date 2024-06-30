"use client";

import { useState } from 'react';
import { z } from 'zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useRouter } from 'next/navigation';
import useAuth from '@/utils/useAuth';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
});

const dogSchema = z.object({
  dogName: z.string().min(1, 'Dog name is required'),
  breed: z.string().min(1, 'Breed is required'),
  age: z.string().min(1, 'Age is required'),
  gender: z.string().min(1, 'Gender is required'),
  photo: z.any().nullable(),
});

const RegistrationFormComponent = () => {
  const router = useRouter();
  const token = useAuth({ redirectIfAuth: true }); // Ensure user is not authenticated to access this form

  const [step, setStep] = useState(1);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    city: '',
    state: '',
    country: '',
  });

  const [dogDetails, setDogDetails] = useState({
    dogName: '',
    breed: '',
    age: '',
    gender: '',
    photo: null,
  });

  const handleNext = () => {
    const validation = userSchema.safeParse(userDetails);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    const validation = dogSchema.safeParse(dogDetails);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token in headers for authentication
        },
        body: JSON.stringify({
          userName: userDetails.name,
          email: userDetails.email,
          phone: userDetails.phone,
          password: userDetails.password,
          city: userDetails.city,
          state: userDetails.state,
          country: userDetails.country,
          petName: dogDetails.dogName,
          breed: dogDetails.breed,
          age: dogDetails.age,
          gender: dogDetails.gender,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Registration successful!');
        router.push('/');
      } else {
        toast.error(data.error || 'Registration failed');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-gray-800 py-10">
      <div className="max-w-2xl mx-auto p-8 bg-gray-200 shadow-2xl rounded-md py-10">
        <ToastContainer />
        {step === 1 && (
          <div>
            <h2 className="text-3xl font-semibold text-black mb-6 mt-2 text-center">User Details</h2>
            <form>
              <div className="mb-6">
                <label className="block text-black font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userDetails.name}
                  placeholder='Enter your name'
                  onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <label className="block text-black font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder='Enter your email'
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userDetails.email}
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <label className="block text-black font-medium mb-2">Phone</label>
                <input
                  type="text"
                  placeholder='Enter your phone number'
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userDetails.phone}
                  onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <label className="block text-black font-medium mb-2">Password</label>
                <input
                  type="password"
                  placeholder='Enter a password'
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userDetails.password}
                  onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <label className="block text-black font-medium mb-2">Country</label>
                <CountryDropdown
                  value={userDetails.country}
                  onChange={(val) => setUserDetails({ ...userDetails, country: val, state: '', city: '' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-black font-medium mb-2">State</label>
                <RegionDropdown
                  country={userDetails.country}
                  value={userDetails.state}
                  onChange={(val) => setUserDetails({ ...userDetails, state: val, city: '' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-black font-medium mb-2">City</label>
                <input
                  type="text"
                  placeholder='Enter your city'
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userDetails.city}
                  onChange={(e) => setUserDetails({ ...userDetails, city: e.target.value })}
                />
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Next
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
            </p>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-3xl font-semibold text-black mb-6 text-center">Dog Details</h2>
            <form>
              <div className="mb-6">
                <label className="block text-black font-medium mb-2">Dog Name</label>
                <input
                  type="text"
                  placeholder='Enter your dog name'
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dogDetails.dogName}
                  onChange={(e) => setDogDetails({ ...dogDetails, dogName: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <label className="block text-black font-medium mb-2">Breed</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dogDetails.breed}
                  placeholder='Enter your dog breed'
                  onChange={(e) => setDogDetails({ ...dogDetails, breed: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <label className="block text-black font-medium mb-2">Age (in months)</label>
                <input
                  type="text"
                  placeholder='Enter your dog age'
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dogDetails.age}
                  onChange={(e) => setDogDetails({ ...dogDetails, age: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <label className="block text-black font-medium mb-2">Gender</label>
                <input
                  type="text"
                  placeholder='Enter your dog gender'
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dogDetails.gender}
                  onChange={(e) => setDogDetails({ ...dogDetails, gender: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <label className="block text-black font-medium mb-2">Photo</label>
                <input
                  type="file"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setDogDetails({ ...dogDetails, photo: e.target.files[0] })}
                />
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleBack}
                className="w-full mt-4 px-4 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Back
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const RegistrationForm = () => {
  return <RegistrationFormComponent />;
};

export default RegistrationForm;
