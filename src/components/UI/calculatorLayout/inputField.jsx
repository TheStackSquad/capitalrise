// src/components/UI/InputField.jsx
'use client';

import React from 'react';

const InputField = ({ label, value, onChange, type = 'number', step = '0.01', min = '0', placeholder }) => {
    return (
        <div className="bg-white dark:bg-card p-6 rounded-lg shadow-lg dark:bg-gray-300">
            <label className="block mb-2 text-lg
            font-jetbrains-medium
            text-gray-900 ">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary font-robotoslab-medium text-gray-900 dark:text-primary"
                step={step}
                min={min}
                placeholder={placeholder}
            />
        </div>

    );
};

export default InputField;