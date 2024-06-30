"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

const useAuth = (options = {}) => {
    const router = useRouter();
    const [token, setToken] = useState(null);

    useEffect(() => {
        const accessToken = Cookies.get('token');
        setToken(accessToken);

        // Redirect unauthenticated users
        if (!accessToken && options.requireAuth) {
            router.replace('/');
        }

        // Redirect authenticated users away from certain routes
        if (accessToken && options.redirectIfAuth) {
            router.replace('/');
        }

    }, [router, options.requireAuth, options.redirectIfAuth]);

    return token;
};

export default useAuth;
