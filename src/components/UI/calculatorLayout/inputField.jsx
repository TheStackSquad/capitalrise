// src/components/UI/InputField.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { formatAsCurrency, parseFormattedCurrency } from '@/utils/inputFormat';
import { Info } from 'lucide-react';

const InputField = ({
    label,
    value,
    onChange,
    placeholder,
    tooltipText,
    name,
    required = false,
    min = 0,
    max = Number.MAX_SAFE_INTEGER,
    isInvalid = false,
    invalidMessage = "Please enter a valid value",
    step = "0.01",
    inputType = "currency" // New prop: "currency", "percentage", or "number"
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [displayValue, setDisplayValue] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);

    // Set appropriate placeholder based on input type
    const defaultPlaceholder =
        inputType === "currency" ? "0.00" :
            inputType === "percentage" ? "0%" :
                inputType === "number" ? "0" :
                    "Enter value";

    // Set actual placeholder
    const actualPlaceholder = placeholder || defaultPlaceholder;

    // Format the value based on the input type
    useEffect(() => {
        if (value === '' || value === null || value === undefined) {
            setDisplayValue('');
            return;
        }

        if (inputType === "currency") {
            setDisplayValue(`$${formatAsCurrency(value.toString())}`);
        } else if (inputType === "percentage") {
            setDisplayValue(`${value}%`);
        } else {
            setDisplayValue(value.toString());
        }
    }, [value, inputType]);

    const handleFocus = (e) => {
        setIsFocused(true);
        // Select all text on focus for easy editing
        e.target.select();
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        let inputValue = e.target.value;
        let numericValue;

        // Remove prefix/suffix and format based on input type
        if (inputType === "currency") {
            inputValue = inputValue.replace(/[$,]/g, '');
            numericValue = inputValue ? parseFloat(inputValue) : 0;
            setDisplayValue(numericValue ? `$${formatAsCurrency(numericValue.toString())}` : '');
        } else if (inputType === "percentage") {
            inputValue = inputValue.replace(/%/g, '');
            numericValue = inputValue ? parseFloat(inputValue) : 0;
            setDisplayValue(numericValue ? `${numericValue}%` : '');
        } else {
            numericValue = inputValue ? parseInt(inputValue, 10) : 0;
            setDisplayValue(numericValue.toString());
        }

        onChange({ target: { value: numericValue } });
    };

    const handleChange = (e) => {
        let input = e.target.value;

        if (inputType === "currency") {
            // Handle currency input
            if (input === '' || input === '$') {
                setDisplayValue(input);
                return;
            }

            if (input.startsWith('$')) {
                input = input.substring(1);
            }

            const formattedValue = formatAsCurrency(input);
            setDisplayValue(`$${formattedValue}`);

            const numericValue = parseFormattedCurrency(formattedValue);
            onChange({ target: { value: numericValue } });
        } else if (inputType === "percentage") {
            // Handle percentage input
            if (input === '' || input === '%') {
                setDisplayValue(input);
                return;
            }

            if (input.endsWith('%')) {
                input = input.substring(0, input.length - 1);
            }

            // Only allow numbers and decimal points
            const numericInput = input.replace(/[^\d.]/g, '');
            let numericValue = numericInput ? parseFloat(numericInput) : 0;

            // Ensure the numeric value is within valid range
            numericValue = Math.max(Math.min(numericValue, max), min);

            setDisplayValue(`${numericInput}%`);
            onChange({ target: { value: numericValue } });
        } else {
            // Handle number input (for days)
            // Only allow integers
            const numericInput = input.replace(/[^\d]/g, '');
            let numericValue = numericInput ? parseInt(numericInput, 10) : 0;

            // Ensure the numeric value is within valid range
            numericValue = Math.max(Math.min(numericValue, max), min);

            setDisplayValue(numericInput);
            onChange({ target: { value: numericValue } });
        }
    };

    return (
        <div className="bg-white dark:bg-card p-6 rounded-lg shadow-lg dark:bg-gray-300">
            <div className="flex items-center mb-2">
                <label
                    htmlFor={name}
                    className="block text-lg font-jetbrains-medium text-gray-900"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {/* Tooltip icon - only show if tooltipText is provided */}
                {tooltipText && (
                    <div className="relative ml-2">
                        <Info
                            size={16}
                            className="text-gray-500 cursor-help"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            role="img"
                            aria-label="More information"
                        />
                        {showTooltip && (
                            <div className="absolute z-10 w-64 p-2 bg-gray-800 text-white text-sm rounded shadow-lg -left-20 bottom-full mb-2">
                                {tooltipText}
                                <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className={`relative rounded-md shadow-sm ${isInvalid ? 'ring-1 ring-red-500' : ''}`}>
                <input
                    id={name}
                    name={name}
                    type="text"
                    value={displayValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={actualPlaceholder}
                    className={`w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary font-robotoslab-medium text-gray-900 dark:text-primary ${isFocused ? 'ring-2 ring-primary' : ''
                        } ${isInvalid ? 'border-red-500 focus:ring-red-500' : ''}`}
                    aria-invalid={isInvalid}
                    aria-describedby={isInvalid ? `${name}-error` : undefined}
                />
            </div>

            {/* Validation error message */}
            {isInvalid && (
                <p id={`${name}-error`} className="mt-1 text-sm text-red-500" role="alert">
                    {invalidMessage}
                </p>
            )}
        </div>
    );
};

export default InputField;