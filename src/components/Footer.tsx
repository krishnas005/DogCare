"use client";
import React from 'react';
import { FaLinkedin, FaEnvelope, FaGlobe } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-gray-800 pb-4 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="md:text-lg text-md font-bold text-white mb-4">Contact Information</h3>
                        <ul className="text-gray-400 md:text-md text-xs">
                            <li className="flex items-center mb-2">
                                <FaEnvelope className="mr-2" />
                                <a href="mailto:krishnakannu05@gmail.com" className="hover:text-white">krishnakannu05@gmail.com</a>
                            </li>
                            <li className="flex items-center mb-2">
                                <FaLinkedin className="mr-2" />
                                <a href="https://www.linkedin.com/in/krishnas05" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn Profile</a>
                            </li>
                            <li className="flex items-center">
                                <FaGlobe className="mr-2" />
                                <a href="https://krishnas05.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Portfolio Website</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="md:text-xl text-lg font-bold text-white mb-4">About DogCare</h3>
                        <p className="text-gray-400 md:text-md text-xs">DogCare is dedicated to providing resources and services for the well-being of dogs. Our mission is to promote responsible pet ownership and support organizations that work for the welfare of stray dogs. Stay tuned for more services.</p>
                    </div>
                </div> */}
                <div className="text-center text-gray-400 md:text-md text-xs">
                    <p>&copy; {new Date().getFullYear()} DogCare. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
