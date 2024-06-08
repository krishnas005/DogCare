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
            {user? <p>{user.name}</p> :<p>No user</p>}
            {/* {user.pets[0] ? user.pets[0]: null} */}
            {user && user.pets ? (
                    user.pets.map(pet => (
                        <li key={pet._id}>
                            <p>Name: {pet.name}</p>
                            <p>Breed: {pet.breed}</p>
                            <p>Age: {pet.age}</p>
                            <p>Gender: {pet.gender}</p>
                        </li>
                    ))
                ) : (
                    <p>No pets found</p>
                )}
        </div>
    );
}

export default Page;
