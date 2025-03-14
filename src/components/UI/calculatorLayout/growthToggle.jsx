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
    <div className="flex flex-col xs:flex-col sm:flex-col md:flex-row gap-2 md:gap-4">
        {['monthly', 'quarterly', '6months'].map((type) => (
            <button
                key={type}
                onClick={() => handleToggle(type)}
                className={`px-4 py-2 rounded-md font-robotoslab-medium
                    w-full md:w-auto mb-2 md:mb-0
                    transition-all duration-300 ease-in-out 
                ${growthType === type
                        ? 'bg-primary text-white scale-105 shadow-md shadow-primary/30'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400 hover:bg-gray-600 dark:hover:bg-gray-800 hover:scale-105'
                    }`}
            >
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
        ))}
    </div>
</div>
    );
};

export default GrowthToggle;
// The GrowthToggle component is a controlled component that allows users to toggle between different growth types. The component receives a prop onToggle, which is a function that will be called whenever the user toggles between growth types. The component maintains the current growth type in its local state using the useState hook.