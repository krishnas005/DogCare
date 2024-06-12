"use client";

import Link from 'next/link';
import { useState, useContext } from 'react';
import { z } from 'zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { GlobalContext } from "@/context";

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export default function LoginForm() {
  const { login, setUser } = useContext(GlobalContext);

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = loginSchema.safeParse(loginDetails);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }
    try {
      const response = await axios.post("/api/users/login", loginDetails);
      const userData = response.data.user;
      setUser(userData);
      login(userData);
      localStorage.setItem('user', JSON.stringify(userData.user));
      localStorage.setItem('pet', JSON.stringify(userData.pet));
      toast.success("Login successful");
      router.push("/");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-gray-800 pt-16 min-h-screen">
      <div className="max-w-md mx-auto p-8 bg-gray-200 shadow-2xl rounded-md">
        <ToastContainer />
        <h2 className="text-3xl font-semibold text-black mb-6 mt-1"><span className='text-blue-700'>Welcome</span> back! {String.fromCodePoint(0x1F44B)}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-black font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={loginDetails.email}
              onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label className="block text-black font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={loginDetails.password}
              onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-black">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}
