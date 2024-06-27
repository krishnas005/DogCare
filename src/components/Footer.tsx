"use client";

import React, { useEffect, useState } from 'react';
import { FaLinkedin, FaEnvelope, FaGlobe } from 'react-icons/fa';
import axios from 'axios';

export default function Footer() {
    const [quote, setQuote] = useState('');

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await fetch("https://favqs.com/api/qotd");
                const data = await res.json();
                setQuote(data.quote.body);
            } catch (error) {
                console.error("Error fetching quote: ", error);
                setQuote("The only way to do great work is to love what you do.");
            }
        };
        fetchApi();
    }, []);

    return (
        <footer className="bg-gray-800 pb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <hr />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
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
                        <h3 className="md:text-lg text-md font-bold text-white mb-4">Do you know?</h3>
                        <p className="text-gray-400 md:text-md text-md italic">
                            {quote ? `"${quote}" - Anonymous` : "Loading quote..."}
                        </p>
                    </div>
                </div>
                <div className="text-center text-gray-400 md:text-md text-xs mt-6">
                    <p>&copy; {new Date().getFullYear()} DogCare. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
