// src/components/UI/marketPulseUI/CryptoPrices.jsx

'use client';

import React, { useEffect, useState } from 'react';
import { fetchCryptoPrices } from '@/utils/fetchCryptoPrices';

const CryptoPrices = () => {
    const [cryptoPrices, setCryptoPrices] = useState({});

    useEffect(() => {
        const loadCryptoPrices = async () => {
            const data = await fetchCryptoPrices();
            setCryptoPrices(data);
        };
        loadCryptoPrices();
    }, []);

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[var(--text)]">Crypto Prices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(cryptoPrices).map(([crypto, prices]) => (
                    <div key={crypto} className="bg-[var(--card)] p-4 rounded-lg shadow-md">
                        <p className="text-lg font-bold text-[var(--text)]">{crypto.toUpperCase()}</p>
                        <p className="text-[var(--text)]">
                            USD: ${prices.usd.toLocaleString()}
                        </p>
                        <p className="text-[var(--text)]">
                            NGN: ₦{prices.ngn.toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CryptoPrices;