// src/components/card/card.jsx

'use client';
import React, { useState } from 'react';
import Modal from '../modal/modal';

const Card = ({ calculation, onRemove }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowDetails = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4 shadow-md relative font-robotoSlab">
            <button
                onClick={onRemove}
                className="absolute top-2 right-2 bg-gray-500 text-gray-800 dark:bg-gray-900 dark:text-yellow-600 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
                X
            </button>
            <div className="space-y-2 bg-cardAlte">
                <h3 className="font-bold">Calculation</h3>
                <p>Asset: ${calculation.currentAsset}</p>
                <p>Growth Rate: {calculation.growthRate}%</p>
                <p>Days: {calculation.days}</p>

                <button
                    onClick={handleShowDetails}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full"
                >
                    Read More
                </button>
            </div>

            {showModal && (
                <Modal
                    calculation={calculation}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default Card;