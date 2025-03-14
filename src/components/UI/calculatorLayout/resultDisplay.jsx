// src/components/UI/ResultsDisplay.jsx
'use client';

import React from 'react';

const ResultsDisplay = ({ result, days, formatCurrency }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg dark:shadow-gray-900/30 mb-8">
            <h2 className="text-2xl font-bold text-gray-600 dark:text-yellow-500 mb-4 font-spacegrotest-bold">Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <p className="text-gray-600 dark:text-yellow-400 mb-1 font-robotoslab-medium">Final Value After {days} Days:</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 font-spacegrotest-bold">
                        {formatCurrency(result.finalValue)}
                    </p>
                </div>
                <div>
                    <p className="text-gray-600 dark:text-yellow-400 mb-1 font-robotoslab-medium">Total Growth:</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400 font-spacegrotest-bold">
                        +{formatCurrency(result.totalGrowth)} ({result.percentageGrowth.toFixed(2)}%)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResultsDisplay;