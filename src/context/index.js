// context/GlobalContext.js

"use client";

import { createContext, useState, useEffect } from 'react';
import Cookies from "js-cookie";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const [isAuthUser, setIsAuthUser] = useState(false);

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
            setUser(userData);
        } else {
            console.log("Context false: ", Cookies.get('token'))
            setIsAuthUser(false);
            setUser({});
        }
    },[Cookies])

    return (
        <GlobalContext.Provider value={{ user, setUser, isAuthUser, setIsAuthUser, login, logout }}>
            {children}
        </GlobalContext.Provider>
    );
};
