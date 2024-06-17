// CustomNavbar.js
"use client";

import Link from 'next/link';
import { useState, useContext, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { GlobalContext } from '@/context';
import { FaRegUserCircle, FaBell, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import dayjs from 'dayjs';

export default function CustomNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [healthAlerts, setHealthAlerts] = useState([]);
  const [petId, setPetId] = useState(null);
  const { isAuthUser, logout } = useContext(GlobalContext);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const petData = JSON.parse(localStorage.getItem('pet')) || {};
    setPetId(petData.length > 0 ? petData[0]._id : null);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProfileOpen(false);
  };

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleNotificationToggle = async () => {
    if (isAuthUser) {
      setIsNotificationOpen(!isNotificationOpen);
      if (!isNotificationOpen) {
        await fetchHealthAlerts();
      }
    } else {
      setIsNotificationOpen(!isNotificationOpen);
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    localStorage.removeItem('pet');
    logout();
    setIsMenuOpen(false);
  };

  const fetchHealthAlerts = async () => {
    try {
      const response = await axios.get(`/api/pet-health-alert?id=${petId}`);
      const alerts = response.data.healthAlerts;
      const filteredAlerts = alerts.filter(alert => {
        const alertDate = dayjs(alert.date);
        const today = dayjs();
        return alertDate.isSame(today, 'day') || alertDate.isSame(today.add(1, 'day'), 'day') || alertDate.isSame(today.add(2, 'day'), 'day');
      });
      setHealthAlerts(filteredAlerts);
    } catch (error) {
      console.error('Failed to fetch health alerts', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-900">DogCare</Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/services/daycare" className="text-gray-800 hover:text-indigo-600">Daycare</Link>
            <Link href="/services/training" className="text-gray-800 hover:text-indigo-600">Training</Link>
            <Link href="/services/veterinary" className="text-gray-800 hover:text-indigo-600">Veterinary</Link>
            <Link href="/articles" className="text-gray-800 hover:text-indigo-600">Articles</Link>
            {isAuthUser && (
              <div className="relative">
                <button className="text-gray-800 hover:text-indigo-600 focus:outline-none mt-1" onClick={handleNotificationToggle}>
                  <FaBell size={24} />
                  {healthAlerts.length > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">!</span>
                  )}
                </button>
                {isNotificationOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-sm">
                    <div className="bg-white p-4 rounded shadow-lg max-w-md w-full md:w-96 max-h-80 overflow-y-auto">
                      <h2 className="text-lg font-bold mb-4">Notifications</h2>
                      {healthAlerts.length > 0 ? (
                        healthAlerts.map(alert => (
                          <div key={alert._id} className="mb-4">
                            <h3 className="text-md font-semibold">{alert.type}</h3>
                            <p className="text-gray-600">{dayjs(alert.date).format('MMMM D, YYYY')}</p>
                            <p className="text-gray-600">{alert.description}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600">No notifications for upcoming dates.</p>
                      )}
                      <button className="absolute top-4 right-4 text-gray-600 hover:text-red-600" onClick={handleNotificationToggle}>
                        <FaTimes size={26} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {isAuthUser ? (
              <div className="relative group">
                <button className="text-gray-800 hover:text-indigo-600 focus:outline-none mt-1" onClick={handleProfileToggle}>
                  <FaRegUserCircle size={30} />
                </button>
                {isProfileOpen && (
                  <div className="absolute bg-white shadow-lg rounded mt-2 -ml-8 z-10">
                    <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
                    <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              pathname === '/login' ? (
                <Link href="/register" className="text-gray-800 hover:text-indigo-600 border border-indigo-600 px-3 py-1 rounded-2xl">Sign Up</Link>
              ) : (
                <Link href="/login" className="text-gray-800 hover:text-indigo-600 border border-indigo-600 px-3 py-1 rounded-2xl">Login</Link>
              )
            )}
          </div>
          <div className="md:hidden flex items-center space-x-4">
            {isAuthUser && (
              <button className="relative text-gray-800 hover:text-indigo-600 focus:outline-none" onClick={handleNotificationToggle}>
                <FaBell size={24} />
                {healthAlerts.length > 0 && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">!</span>
                )}
              </button>
            )}
            {isAuthUser ? (
              <div className="relative group">
                <button className="text-gray-800 hover:text-indigo-600 focus:outline-none mt-1" onClick={handleProfileToggle}>
                  <FaRegUserCircle size={26} />
                </button>
                {isProfileOpen && (
                  <div className="absolute bg-white shadow-lg rounded mt-2">
                    <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
                    <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              pathname === '/login' ? (
                <Link href="/register" className="text-gray-800 hover:text-indigo-600 border border-indigo-600 px-3 py-1 rounded-2xl">Sign Up</Link>
              ) : (
                <Link href="/login" className="text-gray-800 hover:text-indigo-600 border border-indigo-600 px-3 py-1 rounded-2xl">Login</Link>
              )
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
