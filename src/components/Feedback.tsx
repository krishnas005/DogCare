"use client"

import React, { useState, useRef } from "react";
import GithubIcon from "../assets/github-icon.svg";
import LinkedinIcon from "../assets/linkedin-icon.svg";
import LeetcodeIcon from "../assets/leetcode-svgrepo-com.svg";
import Link from "next/link";
import Image from "next/image";
import emailjs from '@emailjs/browser';
import { toast, ToastContainer } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { FaLinkedin, FaEnvelope, FaGlobe } from 'react-icons/fa';


import 'react-toastify/dist/ReactToastify.css';

const EmailSection = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_5ckk1xm', 'template_ade6mdh', form.current, {
                publicKey: 'by8y0qWhlN693Sblj',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    form.current.reset();
                    toast.success('Thanks for contacting!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    return (
        <section
            id="contact"
            className="grid md:grid-cols-2 pt-24 gap-4 relative bg-gray-800 px-8"
        >
            <div className="z-10 ">
                <h5 className="md:text-5xl text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400  to-pink-500 md:mt-12 my-2">
                    About DogCare
                </h5>
                <p className="text-[#ADB7BE] mb-4 max-w-md">
                    {" "}
                    DogCare is dedicated to providing resources and services for the well-being of dogs. Our mission is to promote responsible pet ownership and support organizations that work for the welfare of stray dogs. Stay tuned for more services.
                    <span className="block">Provide us with your valuable feedback!</span>
                </p>
                <div className="socials flex flex-row gap-4">
                    <Link className="w-10" href="https://linkedin.com/in/krishna-sharma-8665a024b">
                        <Image src={LinkedinIcon} alt="Linkedin Icon" />
                    </Link>
                    <Link className="w-10" href="https://github.com/krishnas005">
                        <Image src={GithubIcon} alt="Github Icon" />
                    </Link>
                    <Link className="w-9" href="https://leetcode.com/krishnas05/">
                        <Image src={LeetcodeIcon} alt="Leetcode Icon" />
                    </Link>
                    <Link href="https://krishnas05.vercel.app/" className="text-white mt-1">
                    <FaGlobe size={30}/>
                    </Link>
                </div>
            </div>
            <div className="md:mt-0 mt-10">
                <form className="flex flex-col " ref={form} onSubmit={sendEmail}>
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="text-white block mb-2 text-sm font-medium"
                        >
                            Your email
                        </label>
                        <input
                            name="from_email"
                            type="email"
                            id="email"
                            required
                            className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                            placeholder="example@google.com"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="subject"
                            className="text-white block text-sm mb-2 font-medium"
                        >
                            Subject
                        </label>
                        <input
                            name="subject"
                            type="text"
                            id="subject"
                            required
                            className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Just saying hi"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="message"
                            className="text-white block text-sm mb-2 font-medium"
                        >
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Let's talk about..."
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-violet-500 hover:bg-violet-600 text-white font-medium py-2.5 px-5 rounded-lg w-full"
                    >
                        Send Message
                    </button>
                </form>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>
        </section>
    );
};

export default EmailSection;