// src/components/UI/marketPulseUI/CurrencyConverter.jsx

'use client';

import React, { useState, useEffect } from 'react';
import { fetchExchangeRates } from '@/utils/fetchExchangeRates';

// Formatting functions
const formatUSD = (value) => {
    // Format as USD with $ symbol and commas for thousands
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
};

const formatNGN = (value) => {
    // Format as NGN with ₦ symbol and commas for thousands, showing the last kobo (2 decimal places)
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
};

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(1); // Raw amount value
    const [displayAmount, setDisplayAmount] = useState(''); // Formatted display value for input
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

    // Initialize display amount on mount
    useEffect(() => {
        setDisplayAmount(formatUSD(amount).replace('$', ''));
    }, []);

    // Handle conversion when the amount changes
    useEffect(() => {
        if (exchangeRate > 0 && amount > 0) {
            const converted = amount * exchangeRate;
            setConvertedAmount(converted);
        } else {
            setConvertedAmount(0);
        }
    }, [amount, exchangeRate]);

    // Handle input change
    const handleInputChange = (e) => {
        // Remove any non-digit characters except decimal point
        const inputValue = e.target.value.replace(/[^0-9.]/g, '');

        // Handle decimal points properly
        const parts = inputValue.split('.');
        let cleanValue = parts[0];
        if (parts.length > 1) {
            cleanValue += '.' + parts[1].slice(0, 2); // Only keep 2 decimal places
        }

        // Convert to number and update state
        const numValue = parseFloat(cleanValue) || 0;
        setAmount(numValue);

        // Update display with formatted value
        setDisplayAmount(cleanValue === '' ? '' : formatUSD(numValue).replace('$', ''));
    };

    // Handle input focus
    const handleFocus = (e) => {
        e.target.select();
    };

    // Handle input blur
    const handleBlur = () => {
        // When input loses focus, ensure proper formatting
        setDisplayAmount(formatUSD(amount).replace('$', ''));
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 font-robotoSlab text-[var(--text)]">Currency Converter</h2>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-500 font-robotoSlab">$</span>
                    </div>
                    <input
                        type="text"
                        value={displayAmount}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="p-2 pl-8 border rounded-md font-robotoSlab bg-[var(--card)] text-[var(--text)] w-full"
                        placeholder="0.00"
                        aria-label="Amount in USD"
                    />
                </div>
                <span className="self-center text-[var(--text)] font-medium">USD to NGN</span>
            </div>
            {convertedAmount !== null && (
                <div className="mt-4 p-3 bg-[var(--card)] rounded-md border border-gray-200">
                    <p className="text-[var(--text)] font-robotoSlab">
                        <span className="font-medium">{formatUSD(amount)}</span> = <span className="font-bold">{formatNGN(convertedAmount)}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Exchange Rate: 1 USD = {exchangeRate.toFixed(2)} NGN
                    </p>
                </div>
            )}
        </div>
    );
};

export default CurrencyConverter;