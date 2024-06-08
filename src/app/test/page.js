"use client";

import React from 'react';
import { useContext } from "react"
import { GlobalContext } from "@/context";

const Page = () => {
    const { user, isAuthUser } = useContext(GlobalContext);
    return (
        <div>
            {
                isAuthUser ? <p>Hello</p> : <p>No</p>
            }
            {/* {user} */}
            {user ? <p>{user.name}</p> : <p>No user</p>}
            {/* {user.pets[0] ? user.pets[0]: null} */}
            
        </div>
    );
}

export default Page;
