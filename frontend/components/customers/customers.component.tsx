'use client';

import React, {useEffect, useState} from 'react';
import {useSession} from "next-auth/react";
import {fetchCustomers} from "@/services/api.service";

interface Customer {
    id: string;
    name: string;
    version: number;
    createdDate: string;
    lastModifiedDate: string;
}

const Customers = () => {
    const {data: session, status} = useSession();
    const [customers, setCustomers] = useState<Customer[]>([])

    useEffect(() => {
        const loadCustomers = async () => {
            if (session) {
                const accessToken = session.accessToken;
                const res = await fetchCustomers(accessToken)

                setCustomers(res)
            }
        }

        loadCustomers()
    }, [session])

    if (status === "unauthenticated") {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6 text-black text-center">Customer will be shown after login</h1>
            </div>
        );
    }

    if (customers?.length === 0) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6 text-black text-center">No Customers</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-black text-center">Customers (secured api)</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {customers.map((customer) => (
                    <div
                        key={customer.id}
                        className="bg-white shadow-md rounded-lg p-4 border border-gray-200 text-center"
                    >
                        <h2 className="text-xl font-semibold mb-2 text-black">{customer.name}</h2>
                        <p className="text-black">
                            <span className="font-bold">Version:</span> {customer.version}
                        </p>
                        <p className="text-gray-500 text-sm mt-4">
                            Created at: {new Date(customer.createdDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-500 text-sm">
                            Last Modified: {new Date(customer.lastModifiedDate).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Customers;