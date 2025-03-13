//src/app/calculator/page.jsx

'use client';

import React from 'react';
import Calculator from '@/components/UI/calculatorLayout/calculator';

export default function CalculatorPage() {
    return (
        <main className="min-h-screen py-12 px-4">
            <Calculator />
        </main>
    );
}