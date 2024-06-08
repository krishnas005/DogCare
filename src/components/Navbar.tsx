"use client";

import Link from 'next/link';
import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '@/context';
import { FaRegUserCircle } from "react-icons/fa";
import Cookies from "js-cookie"

export default function CustomNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthUser, logout } = useContext(GlobalContext);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProfileOpen(false);
  };

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-900">DogCare</Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {/* <Link href="/services/adoption" className="text-gray-800 hover:text-indigo-600">Adoption</Link> */}
            <Link href="/services/daycare" className="text-gray-800 hover:text-indigo-600">Daycare</Link>
            <Link href="/services/training" className="text-gray-800 hover:text-indigo-600">Training</Link>
            <Link href="/services/veterinary" className="text-gray-800 hover:text-indigo-600">Veterinary</Link>
            <Link href="/articles" className="text-gray-800 hover:text-indigo-600">Articles</Link>
            {isAuthUser ? (
              <div className="relative group">
                <button className="text-gray-800 hover:text-indigo-600 focus:outline-none mt-1.5" onClick={handleProfileToggle}>
                  <FaRegUserCircle size={30} />
                </button>
                {isProfileOpen && (
                  <div className="absolute bg-white shadow-lg rounded mt-2 -ml-8 z-10">
                    <Link href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
                    <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/register" className="text-gray-800 hover:text-indigo-600 border border-indigo-600 px-3 py-1 rounded-2xl">Sign up</Link>
            )}
          </div>
          <div className="md:hidden flex items-center space-x-3">
            {isAuthUser ? (
              <div className="relative group">
                <button className="text-gray-800 hover:text-indigo-600 focus:outline-none mt-1" onClick={handleProfileToggle}>
                  <FaRegUserCircle size={28} />
                </button>
                {isProfileOpen && (
                  <div className="absolute bg-white shadow-lg rounded mt-2">
                    <Link href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
                    <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/register" className="text-gray-800 hover:text-indigo-600 border border-indigo-600 px-3 py-1 rounded-2xl">Sign up</Link>
            )}
            <button
              onClick={handleMenuToggle}
              className="text-gray-800 hover:text-indigo-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* <Link href="/services/adoption" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-indigo-600 hover:bg-gray-100">Adoption</Link> */}
            <Link href="/services/daycare" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-indigo-600 hover:bg-gray-100">Daycare</Link>
            <Link href="/services/training" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-indigo-600 hover:bg-gray-100">Training</Link>
            <Link href="/services/veterinary" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-indigo-600 hover:bg-gray-100">Veterinary</Link>
            <Link href="/articles" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-indigo-600 hover:bg-gray-100">Articles</Link>
          </div>
        </div>
      )}
    </nav>
  );
}


