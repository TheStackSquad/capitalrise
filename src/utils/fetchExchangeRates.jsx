// src/utils/fetchExchangeRates.js
const API_KEY = process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY;

export const fetchExchangeRates = async () => {
    try {
        // Fetch the exchange rate for USD to NGN directly
        const response = await fetch(
            `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/USD/NGN`
        );
        const data = await response.json();

        // Check if the API response is successful
        if (data.result === 'success') {
            return {
                usdToNgn: data.conversion_rate, // Direct conversion rate from USD to NGN
            };
        } else {
            throw new Error(data['error-type'] || 'Failed to fetch exchange rate');
        }
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        return {
            usdToNgn: 0, // Return 0 in case of an error
        };
    }
};