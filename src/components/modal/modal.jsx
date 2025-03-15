// src/components/modal/modal.jsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ calculation, onClose }) => {
    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-darkPrimary p-6 rounded-lg w-11/12 max-w-md"
                initial={{ y: '-100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-100%' }}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-white">
                    X
                </button>
                <h3 className="text-xl font-bold mb-4">Calculation Details</h3>
                <p>Asset: ${calculation.currentAsset}</p>
                <p>Growth Rate: {calculation.growthRate}%</p>
                <p>Days: {calculation.days}</p>
                <p>Final Value: ${calculation.result.finalValue}</p>
                <p>Total Growth: ${calculation.result.totalGrowth}</p>
                <p>Percentage Growth: {calculation.result.percentageGrowth}%</p>
            </motion.div>
        </motion.div>
    );
};

export default Modal;