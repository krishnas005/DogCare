"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

const useAuth = (WrappedComponent, options = {}) => {
    return (props) => {
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

        }, [router]);

        if ((options.requireAuth && !token) || (options.redirectIfAuth && token)) {
            return (
                <div>Loading....</div>
            );
        }

        return <WrappedComponent {...props} />;
    };
};

export default useAuth;
