// src/components/motion/slidePanel.jsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '@/components/card/card';
import { useCalculations } from '@/context/calculationContext';
import { showSuccess } from '@/utils/alertManager';

const SlidePanel = ({ onCardClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { savedCalculations, removeCalculation, clearAllCalculations } = useCalculations();

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    const handleClearAll = () => {
        clearAllCalculations();
        showSuccess("All saved calculations cleared!");
    };

    const handleRemoveCalculation = (index) => {
        removeCalculation(index);
        showSuccess("Calculation removed!");
    };

    return (
        <div className="relative">
            <motion.div
                className="fixed top-16 h-[calc(100%-4rem)] bg-darkPrimary shadow-lg z-50"
                style={{ width: isOpen ? '16rem' : '3rem' }}
                initial={{ x: 0 }}
                animate={{ x: isOpen ? 0 : '-80%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <button
                    onClick={togglePanel}
                    className="absolute top-4 right-2 text-blue-200 bg-blue-500 dark:bg-gray-400 dark:text-yellow-800 z-50"
                    aria-label={isOpen ? "Close panel" : "Open panel"}
                >
                    {isOpen ? <ChevronLeft /> : <ChevronRight />}
                </button>

                {isOpen && (
                    <div className="p-4 mt-12 overflow-y-auto max-h-full">
                        {savedCalculations.length > 0 ? (
                            <>
                                <button
                                    onClick={handleClearAll}
                                    className="w-full py-2 bg-blue-500 hover:bg-red-600 text-white dark:bg-gray-400 rounded-md mb-4 transition-colors"
                                >
                                    Clear All
                                </button>
                                <div className="space-y-4 bg-gray-300 dark:bg-yellow-800 rounded-md p-4">
                                    {savedCalculations.map((calculation, index) => (
                                        <Card
                                            key={index}
                                            calculation={calculation}
                                            onRemove={() => handleRemoveCalculation(index)}
                                            onClick={() => onCardClick && onCardClick(calculation)}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <p className="text-gray-400 text-center">No saved calculations</p>
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default SlidePanel;