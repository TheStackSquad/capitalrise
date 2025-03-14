// src/components/UI/marketPulseUI/Favorites.jsx
'use client';

import React, { useState } from 'react';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (item) => {
        const updatedFavorites = [...favorites, item];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-[var(--text)]">Favorites</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {favorites.map((favorite, index) => (
                    <div key={index} className="bg-[var(--card)] p-4 rounded-lg shadow-md">
                        <p className="text-lg font-bold text-[var(--text)]">{favorite}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;