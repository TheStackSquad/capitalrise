// src/utils/fetchExchangeRates.js
const API_KEY = process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY;

export const fetchExchangeRates = async () => {
    try {
        const response = await fetch(
            `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/NGN`
        );
        const data = await response.json();
        return {
            usd: 1 / data.conversion_rates.USD, // Convert USD to NGN
            eur: 1 / data.conversion_rates.EUR, // Convert EUR to NGN
            gbp: 1 / data.conversion_rates.GBP, // Convert GBP to NGN
        };
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        return {
            usd: 0,
            eur: 0,
            gbp: 0,
        };
    }
};