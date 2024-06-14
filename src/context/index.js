"use client";

import { createContext, useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    
    const [user, setUser] = useState(null);
    const [pet, setPet] = useState(null);
    const [isAuthUser, setIsAuthUser] = useState(false);
    const [messages, setMessages] = useState([]);
    const [token, setToken] = useState(null);

    const login = (userData) => {
        setIsAuthUser(true);
        setUser(userData);
    };

    const logout = () => {
        // Cookies.remove('token');
        setUser(null);
        setIsAuthUser(false);
    };

    useEffect(() => {
        if(Cookies.get('token') !== undefined) {
            setIsAuthUser(true);
            const userData = JSON.parse(localStorage.getItem('user')) || {};
            const petData = JSON.parse(localStorage.getItem('pet')) || {};
            setToken(Cookies.get('token'));
            setUser(userData);
            setPet(petData);
        } else {
            setIsAuthUser(false);
            setUser({});
        }
    },[]);

    // useEffect(() => {

    //     const protectedRoutes = ['/profile', '/services'];
    //     const authRoutes = ['/login', '/register'];

    //     if (isAuthUser && authRoutes.includes(pathname)) {
    //         router.push('/');
    //         toast.warning('You are already logged in!');
    //     }

    //     if (!isAuthUser && protectedRoutes.includes(pathname)) {
    //         router.push('/login');
    //         toast.error('You must be logged in to access this page!');
    //     }
    // }, [isAuthUser, pathname]);

    return (
        <GlobalContext.Provider value={{ user, setUser, pet, setPet, isAuthUser, setIsAuthUser, login, logout, messages, setMessages, token }}>
            {children}
            <ToastContainer />
        </GlobalContext.Provider>
    );
};
