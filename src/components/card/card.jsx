// src/components/card/card.jsx
'use client';

import React from 'react';

const Card = ({ calculation, onRemove }) => {
    return (
        <div className=" p-4 rounded-lg mb-4 shadow-md relative font-robotoSlab">
            <button onClick={onRemove} className="absolute top-2 right-2 bg-gray-500
            text-gray-800 dark:bg-gray-900 dark:text-yellow-600">
                X
            </button>
            <div className="space-y-2 bg-cardAlte"> {/* Added spacing between elements */}
                <h3 className="font-bold">Calculation</h3>
                <p>Asset: ${calculation.currentAsset}</p>
                <p>Growth Rate: {calculation.growthRate}%</p>
                <p>Days: {calculation.days}</p>
            </div>
        </div>
    );
};

export default Card;