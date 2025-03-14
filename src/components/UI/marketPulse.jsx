// src/components/UI/marketPulse.jsx
'use client';

import React from 'react';
import Header from '@/components/UI/marketPulseUI/header';
import CryptoPrices from '@/components/UI/marketPulseUI/cryptoPrices';
import CurrencyConverter from '@/components/UI/marketPulseUI/currencyConverter';
import Favorites from '@/components/UI/marketPulseUI/favorites';

const MarketPulse = () => {
    return (
        <div className="p-6 bg-[var(--background)] min-h-screen">
            <Header />
            <CryptoPrices />
            <CurrencyConverter />
            <Favorites />
        </div>
    );
};

export default MarketPulse;