'use client';

import React, {useEffect, useState} from 'react';
import {fetchBeers} from "@/services/api.service";

interface Beer {
    id: string;
    version: number;
    quantity: number;
    name: string;
    upc: string;
    style: string;
    price: number;
    createDate: string;
    updateDate: string;
}

const Beers = () => {
    const [beers, setBeers] = useState<Beer[]>([])

    useEffect(() => {
        const loadBeers = async () => {
            const res = await fetchBeers()

            setBeers(res)
        }

        loadBeers()
    }, [])

    if (beers?.length === 0) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6 text-black text-center">No Beers</h1>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-black text-center">Beers (public api)</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {beers.map((beer) => (
                    <div
                        key={beer.id}
                        className="bg-white shadow-md rounded-lg p-4 border border-gray-200 text-center"
                    >
                        <h2 className="text-xl font-semibold mb-2 text-black">{beer.name}</h2>
                        <p className="text-black">
                            <span className="font-bold">Style:</span> {beer.style}
                        </p>
                        <p className="text-black">
                            <span className="font-bold">Price:</span> ${beer.price.toFixed(2)}
                        </p>
                        <p className="text-black">
                            <span className="font-bold">Quantity:</span> {beer.quantity}
                        </p>
                        <p className="text-black">
                            <span className="font-bold">UPC:</span> {beer.upc}
                        </p>
                        <p className="text-gray-500 text-sm mt-4">
                            Created at: {new Date(beer.createDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-500 text-sm">
                            Updated at: {new Date(beer.updateDate).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Beers;