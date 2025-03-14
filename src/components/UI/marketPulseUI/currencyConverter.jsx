// src/components/UI/marketPulseUI/CurrencyConverter.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { fetchExchangeRates } from '@/utils/fetchExchangeRates';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('NGN');
    const [toCurrency, setToCurrency] = useState('USD');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [exchangeRates, setExchangeRates] = useState({});

    const currencies = ['NGN', 'USD', 'EUR', 'GBP'];

    useEffect(() => {
        const loadExchangeRates = async () => {
            const rates = await fetchExchangeRates();
            setExchangeRates(rates);
        };
        loadExchangeRates();
    }, []);

    const handleConvert = () => {
        if (fromCurrency === 'NGN') {
            const rate = exchangeRates[toCurrency.toLowerCase()];
            setConvertedAmount((amount * rate).toFixed(2));
        } else if (toCurrency === 'NGN') {
            const rate = exchangeRates[fromCurrency.toLowerCase()];
            setConvertedAmount((amount / rate).toFixed(2));
        } else {
            const rateFrom = exchangeRates[fromCurrency.toLowerCase()];
            const rateTo = exchangeRates[toCurrency.toLowerCase()];
            setConvertedAmount(((amount / rateFrom) * rateTo).toFixed(2));
        }
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[var(--text)]">Currency Converter</h2>
            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="p-2 border rounded-md bg-[var(--card)] text-[var(--text)]"
                />
                <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="p-2 border rounded-md bg-[var(--card)] text-[var(--text)]"
                >
                    {currencies.map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
                <span className="self-center text-[var(--text)]">to</span>
                <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="p-2 border rounded-md bg-[var(--card)] text-[var(--text)]"
                >
                    {currencies.map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
                <button
                    onClick={handleConvert}
                    className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md"
                >
                    Convert
                </button>
            </div>
            {convertedAmount && (
                <p className="mt-4 text-[var(--text)]">
                    {amount} {fromCurrency} = {convertedAmount} {toCurrency}
                </p>
            )}
        </div>
    );
};

export default CurrencyConverter;