// src/context/CalculationContext.jsx

'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';

const CalculationContext = createContext();

export const CalculationProvider = ({ children }) => {
    const [savedCalculations, setSavedCalculations] = useState([]);

    useEffect(() => {
        // Load saved calculations on mount
        const saved = JSON.parse(localStorage.getItem('savedCalculations')) || [];
        setSavedCalculations(saved);
    }, []);

    const addCalculation = (calculation) => {
        const newSavedCalculations = [...savedCalculations, calculation];
        localStorage.setItem('savedCalculations', JSON.stringify(newSavedCalculations));
        setSavedCalculations(newSavedCalculations);
    };

    const removeCalculation = (index) => {
        const newSavedCalculations = savedCalculations.filter((_, i) => i !== index);
        localStorage.setItem('savedCalculations', JSON.stringify(newSavedCalculations));
        setSavedCalculations(newSavedCalculations);
    };

    const clearAllCalculations = () => {
        localStorage.removeItem('savedCalculations');
        setSavedCalculations([]);
    };

    return (
        <CalculationContext.Provider
            value={{
                savedCalculations,
                addCalculation,
                removeCalculation,
                clearAllCalculations
            }}
        >
            {children}
        </CalculationContext.Provider>
    );
};

export const useCalculations = () => useContext(CalculationContext);