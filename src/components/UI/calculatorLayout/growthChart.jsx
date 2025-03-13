// src/components/UI/GrowthChart.jsx
'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GrowthChart = ({ chartData, formatCurrency, growthType }) => {
    // Determine the X-axis label based on the growth type
    const xAxisLabel = growthType === 'monthly' ? 'Months' :
        growthType === 'quarterly' ? 'Quarters' :
            growthType === '6months' ? '6 Months' :
                'Days';

    return (
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg dark:shadow-gray-900/30">
            <h2 className="text-2xl font-bold mb-4 font-spacegrotest-bold">Growth Chart</h2>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis
                            dataKey="day"
                            label={{ value: xAxisLabel, position: 'insideBottomRight', offset: -10 }}
                            stroke="var(--text)"
                        />
                        <YAxis
                            label={{ value: 'Value ($)', angle: -90, position: 'insideLeft' }}
                            stroke="var(--text)"
                        />
                        <Tooltip
                            formatter={(value) => [`${formatCurrency(value)}`, 'Asset Value']}
                            labelFormatter={(label) => `${xAxisLabel} ${label}`}
                            contentStyle={{
                                backgroundColor: 'var(--background)',
                                border: '1px solid var(--text)',
                                color: 'var(--text)'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="var(--primary)"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default GrowthChart;