// src/components/UI/marketPulseUI/CurrencyConverter.jsx

'use client';

import React, { useState, useEffect } from 'react';
import { fetchExchangeRates } from '@/utils/fetchExchangeRates';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(1); // Default amount to convert
    const [convertedAmount, setConvertedAmount] = useState(null); // Converted amount in NGN
    const [exchangeRate, setExchangeRate] = useState(0); // USD to NGN exchange rate

    // Fetch the exchange rate on component mount
    useEffect(() => {
        const loadExchangeRate = async () => {
            const rates = await fetchExchangeRates();
            setExchangeRate(rates.usdToNgn); // Set the USD to NGN rate
        };
        loadExchangeRate();
    }, []);

    // Handle conversion when the amount changes
    useEffect(() => {
        if (exchangeRate > 0) {
            const converted = (amount * exchangeRate).toFixed(2); // Convert USD to NGN
            setConvertedAmount(converted);
        }
    }, [amount, exchangeRate]);

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[var(--text)]">Currency Converter</h2>
            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    className="p-2 border rounded-md bg-[var(--card)] text-[var(--text)]"
                    min="0"
                />
                <span className="self-center text-[var(--text)]">USD to NGN</span>
            </div>
            {convertedAmount !== null && (
                <p className="mt-4 text-[var(--text)]">
                    {amount} USD = {convertedAmount} NGN
                </p>
            )}
        </div>
    );
};

export default CurrencyConverter;