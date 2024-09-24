'use client';

import React, {useEffect, useState} from 'react';
import {getProviders, useSession, signIn, signOut} from "next-auth/react";

const Auth = () => {

    const {status} = useSession();
    const [providers, setProviders] = useState<any>(null);

    useEffect(() => {
        const setAuthProviders = async () => {
            const res = await getProviders();
            // @ts-ignore
            setProviders(res);
        };

        setAuthProviders();
    }, []);

    return (
        <>
            <p className="text-lg font-medium text-gray-700 mb-4">
                {status === "unauthenticated" ? "Click to authorize" : "Click to logout"}
            </p>

            {status === "unauthenticated" && (
                providers &&
                Object.values(providers).map((provider: any) => (
                    <button
                        key={provider.id}
                        onClick={() => {
                            signIn(provider.id);
                        }}
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        <span>Login or Register</span>
                    </button>
                ))
            )}

            {status === "authenticated" && (
                <button
                    onClick={() => {
                        signOut();
                    }}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                >
                    <span>Sign Out</span>
                </button>
            )
            }
        </>
    );
};

export default Auth;