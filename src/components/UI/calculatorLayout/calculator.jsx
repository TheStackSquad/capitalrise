// src/components/UI/Calculator.jsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InputField from '@/components/UI/calculatorLayout/inputField';
import GrowthToggle from '@/components/UI/calculatorLayout/growthToggle';
import ResultsDisplay from '@/components/UI/calculatorLayout/resultDisplay';
import GrowthChart from '@/components/UI/calculatorLayout/growthChart';
import { fadeInUp, staggerContainer } from '@/components/motion/animation';

const Calculator = () => {
    const [currentAsset, setCurrentAsset] = useState('');
    const [growthRate, setGrowthRate] = useState(2);
    const [days, setDays] = useState(30);
    const [growthType, setGrowthType] = useState('monthly'); // Default to 'monthly'
    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState([]);

    const handleAssetChange = (e) => {
        setCurrentAsset(e.target.value);
    };

    // Handle growth type toggle
    const handleGrowthTypeToggle = (type, days) => {
        setGrowthType(type);
        setDays(days); // Update the number of days based on the selected growth type
    };

    const calculateGrowth = () => {
        const growthHistory = [];
        let currentValue = currentAsset;

        // Day 0 (starting point)
        growthHistory.push({
            day: 0,
            value: currentValue
        });

        // Calculate for each day
        for (let day = 1; day <= days; day++) {
            const dailyGrowth = currentValue * (growthRate / 100);
            currentValue += dailyGrowth;

            growthHistory.push({
                day,
                value: currentValue
            });
        }

        setChartData(growthHistory);

        const finalValue = growthHistory[growthHistory.length - 1].value;
        const totalGrowth = finalValue - currentAsset;
        const percentageGrowth = (totalGrowth / currentAsset) * 100;

        setResult({
            finalValue,
            totalGrowth,
            percentageGrowth
        });
    };

    const resetCalculator = () => {
        setCurrentAsset(0); // Reset to 0
        setGrowthRate(2);
        setDays(30); // Reset to default days for 'monthly'
        setGrowthType('monthly'); // Reset to default growth type
        setResult(null);
        setChartData([]);
    };

    const saveCalculation = () => {
        const savedCalculations = JSON.parse(localStorage.getItem('savedCalculations')) || [];
        savedCalculations.push({ currentAsset, growthRate, days, result });
        localStorage.setItem('savedCalculations', JSON.stringify(savedCalculations));
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="w-full max-w-6xl mx-auto p-6 bg-darkPrimary text-gray-200 rounded-lg shadow-lg"
        >
            {/* Title */}
            <motion.h1
                variants={fadeInUp}
                className="text-4xl font-bold text-center mb-8 text-primary font-spacegrotest-bold"
            >
                Growth Calculator
            </motion.h1>

            {/* Input Fields */}
            <motion.div
                variants={fadeInUp}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
                <InputField
                    label="Current Asset Value ($)"
                    value={currentAsset}
                    onChange={(e) => setCurrentAsset(Number(e.target.value))}
                    placeholder="Enter value"
                    className="bg-card text-card-foreground border border-gray-700 rounded-lg p-4"
                    inputType="currency"
                    tooltipText="The current value of your asset before growth"
                    name="currentAsset"
                />
                <InputField
                    label="Daily Growth Rate (%)"
                    value={growthRate}
                    onChange={(e) => setGrowthRate(Number(e.target.value))}
                    className="bg-card text-card-foreground border border-gray-700 rounded-lg p-4"
                    inputType="percentage"
                    placeholder="Enter growth rate"
                    tooltipText="The percentage by which your asset will grow each day"
                    name="growthRate"
                />
            </motion.div>

            <motion.div
                variants={fadeInUp}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
                <InputField
                    label="Number of Days"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    step="1"
                    min="1"
                    className="bg-card text-card-foreground border border-gray-700 rounded-lg p-4"
                    inputType="number"
                    placeholder="Enter number of days"
                    tooltipText="The period of time over which the growth will be calculated"
                    name="days"
                />
                <GrowthToggle onToggle={handleGrowthTypeToggle} />
            </motion.div>

            {/* Buttons */}
            <motion.div
                variants={fadeInUp}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
                <button
                    onClick={calculateGrowth}
                    className="w-full py-4 bg-primary hover:bg-opacity-90 text-darkPrimary font-bold rounded-md transition-transform transform hover:scale-105 font-spacegrotest-bold shadow-lg"
                >
                    Calculate Growth
                </button>
                <button
                    onClick={resetCalculator}
                    className="w-full py-4 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-md transition-transform transform hover:scale-105 font-spacegrotest-bold shadow-lg"
                >
                    Reset
                </button>
            </motion.div>

            {/* Results */}
            {result && (
                <>
                    <ResultsDisplay result={result} days={days} formatCurrency={formatCurrency} />
                    <button
                        onClick={saveCalculation}
                        className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition-transform transform hover:scale-105 font-spacegrotest-bold shadow-lg mb-8"
                    >
                        Save Calculation
                    </button>
                </>
            )}

            {/* Chart */}
            {chartData.length > 0 && (
                <GrowthChart chartData={chartData} formatCurrency={formatCurrency} growthType={growthType} />
            )}
        </motion.div>

    );
};

export default Calculator;