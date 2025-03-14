// src/components/UI/GrowthChart.jsx

'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GrowthChart = ({ chartData, formatCurrency, growthType }) => {
    // Determine the X-axis label based on the growth type
    const xAxisLabel =
        growthType === 'monthly' ? 'Months' :
            growthType === 'quarterly' ? 'Quarters' :
                growthType === '6months' ? '6 Months' : 'Days';

    return (
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg dark:shadow-gray-900/30">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-yellow-400 mb-4 font-spacegrotest-bold">
                Growth Chart
            </h2>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        {/* Grid Styling: Lighter in light mode, subtle in dark mode */}
                        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-300 dark:text-gray-600" />

                        {/* X-Axis and Y-Axis */}
                        <XAxis
                            dataKey="day"
                            label={{ value: xAxisLabel, position: 'insideBottomRight', offset: -10 }}
                            stroke="currentColor"
                            className="text-gray-600 dark:text-gray-400"
                        />
                        <YAxis
                            label={{ value: 'Value ($)', angle: -90, position: 'insideLeft' }}
                            stroke="currentColor"
                            className="text-gray-600 dark:text-gray-400"
                        />

                        {/* Tooltip Styling */}
                        <Tooltip
                            formatter={(value) => [`${formatCurrency(value)}`, 'Asset Value']}
                            labelFormatter={(label) => `${xAxisLabel} ${label}`}
                            contentStyle={{
                                backgroundColor: 'var(--background)',
                                border: '1px solid var(--text)',
                                color: 'var(--primary)',
                                boxShadow: '0px 4px 10px rgba(0,0,0,0.2)'
                            }}
                        />

                        {/* Line Styling */}
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="currentColor"
                            strokeWidth={3}
                            className="text-primary dark:text-yellow-600"
                            dot={{ r: 4, stroke: 'currentColor', strokeWidth: 2, fill: 'white' }}
                            activeDot={{ r: 8, fill: 'currentColor', stroke: 'white', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default GrowthChart;
