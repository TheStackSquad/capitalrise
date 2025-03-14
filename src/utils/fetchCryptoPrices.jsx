// src/utils/fetchCryptoPrices.js
export const fetchCryptoPrices = async () => {
    try {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,tether,solana,ethereum&vs_currencies=ngn`
        );
        const data = await response.json();
        return {
            bitcoin: data.bitcoin.ngn,
            tether: data.tether.ngn,
            solana: data.solana.ngn,
            ethereum: data.ethereum.ngn,
        };
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
        return {
            bitcoin: 0,
            tether: 0,
            solana: 0,
            ethereum: 0,
        };
    }
};