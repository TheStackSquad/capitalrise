// src/components/UI/GrowthToggle.jsx
'use client';

import React, { useState } from 'react';

const GrowthToggle = ({ onToggle }) => {
    const [growthType, setGrowthType] = useState('monthly'); // Default to 'monthly'

    const handleToggle = (type) => {
        setGrowthType(type);

        // Calculate the number of days based on the selected growth type
        let days;
        switch (type) {
            case 'monthly':
                days = 30;
                break;
            case 'quarterly':
                days = 90;
                break;
            case '6months':
                days = 180;
                break;
            default:
                days = 30; // Fallback to monthly
        }

        // Pass the growth type and corresponding days to the parent component
        onToggle(type, days);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg dark:shadow-gray-900/30">
            <label className="block mb-2 text-lg font-jetbrains-medium text-gray-900 dark:text-primary">
                Growth Type
            </label>
            <div className="flex gap-4">
                <button
                    onClick={() => handleToggle('monthly')}
                    className={`px-4 py-2 rounded-md font-robotoslab-medium ${growthType === 'monthly'
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                        }`}
                >
                    Monthly
                </button>
                <button
                    onClick={() => handleToggle('quarterly')}
                    className={`px-4 py-2 rounded-md font-robotoslab-medium ${growthType === 'quarterly'
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                        }`}
                >
                    Quarterly
                </button>
                <button
                    onClick={() => handleToggle('6months')}
                    className={`px-4 py-2 rounded-md font-robotoslab-medium ${growthType === '6months'
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                        }`}
                >
                    6 Months
                </button>
            </div>
        </div>
    );
};

export default GrowthToggle;