"use client";

import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export default function LoginForm() {
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = () => {
    const validation = loginSchema.safeParse(loginDetails);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }
    console.log('Login Details:', loginDetails);
    toast.success('Login successful!');
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-md mt-10">
      <ToastContainer />
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Login</h2>
      <form>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={loginDetails.email}
            onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={loginDetails.password}
            onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-blue-500 hover:underline">Register here </Link>
      </p>
    </div>
  );
}
