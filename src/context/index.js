// context/GlobalContext.js

"use client";

import { createContext, useState, useEffect } from 'react';
import Cookies from "js-cookie";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const [pet, setPet] = useState(null);
    const [isAuthUser, setIsAuthUser] = useState(false);
    const [messages, setMessages] = useState([]);

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
        // console.log("document: ", document.cookie)
        if(Cookies.get('token') !== undefined) {
            setIsAuthUser(true);
            console.log("Context true: ", Cookies.get('token'))
            const userData = JSON.parse(localStorage.getItem('user')) || {};
            const petData = JSON.parse(localStorage.getItem('pet')) || {};
            console.log("Context user data: ", userData)
            console.log("Context pet data: ", petData)
            setUser(userData);
            setPet(petData)
        } else {
            console.log("Context false: ", Cookies.get('token'))
            setIsAuthUser(false);
            setUser({});
        }
    },[Cookies])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('/api/messages');
                setMessages(response.data.messages);
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        };
        fetchMessages();
    }, []);


    return (
        <GlobalContext.Provider value={{ user, setUser, pet, setPet, isAuthUser, setIsAuthUser, login, logout, messages, setMessages }}>
            {children}
        </GlobalContext.Provider>
    );
};