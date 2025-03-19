// src/components/modal/modal.jsx

'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Modal = ({ calculation, onClose }) => {
    const [calculationData, setCalculationData] = useState(calculation);

    useEffect(() => {
        // If calculation is not provided directly, get it from localStorage
        if (!calculation) {
            try {
                const savedCalculations = JSON.parse(localStorage.getItem('savedCalculation')) || [];
                if (savedCalculations.length > 0) {
                    setCalculationData(savedCalculations[0]);
                }
            } catch (error) {
                console.error('Error loading calculation from localStorage:', error);
            }
        }
    }, [calculation]);

    if (!calculationData) return null;

    // Format numbers for better display
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-white dark:bg-darkPrimary p-6 rounded-lg w-11/12 max-w-md shadow-xl"
                initial={{ y: '-100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-100%' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Calculation Details</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white bg-gray-200 dark:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                    >
                        X
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <p className="text-gray-600 dark:text-gray-300">Asset:</p>
                        <p className="text-right font-semibold">{formatCurrency(calculationData.currentAsset)}</p>

                        <p className="text-gray-600 dark:text-gray-300">Growth Rate:</p>
                        <p className="text-right font-semibold">{calculationData.growthRate}%</p>

                        <p className="text-gray-600 dark:text-gray-300">Days:</p>
                        <p className="text-right font-semibold">{calculationData.days}</p>

                        <p className="text-gray-600 dark:text-gray-300">Growth Type:</p>
                        <p className="text-right font-semibold capitalize">{calculationData.growthType || 'Daily'}</p>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <h4 className="font-bold mb-2 text-blue-800 dark:text-blue-300">Results</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <p className="text-gray-600 dark:text-gray-300">Final Value:</p>
                            <p className="text-right font-semibold">{formatCurrency(calculationData.result.finalValue)}</p>

                            <p className="text-gray-600 dark:text-gray-300">Total Growth:</p>
                            <p className="text-right font-semibold">{formatCurrency(calculationData.result.totalGrowth)}</p>

                            <p className="text-gray-600 dark:text-gray-300">Percentage Growth:</p>
                            <p className="text-right font-semibold">{calculationData.result.percentageGrowth.toFixed(2)}%</p>
                        </div>
                    </div>

                    {calculationData.timestamp && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
                            Calculated on: {new Date(calculationData.timestamp).toLocaleString()}
                        </p>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full"
                >
                    Close
                </button>
            </motion.div>
        </motion.div>
    );
};

export default Modal;