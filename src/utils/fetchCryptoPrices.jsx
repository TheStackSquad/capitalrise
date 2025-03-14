export const fetchCryptoPrices = async () => {
    try {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,tether,solana,ethereum&vs_currencies=usd,ngn`
        );
        const data = await response.json();
        return {
            bitcoin: {
                usd: data.bitcoin.usd,
                ngn: data.bitcoin.ngn,
            },
            tether: {
                usd: data.tether.usd,
                ngn: data.tether.ngn,
            },
            solana: {
                usd: data.solana.usd,
                ngn: data.solana.ngn,
            },
            ethereum: {
                usd: data.ethereum.usd,
                ngn: data.ethereum.ngn,
            },
        };
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
        return {
            bitcoin: { usd: 0, ngn: 0 },
            tether: { usd: 0, ngn: 0 },
            solana: { usd: 0, ngn: 0 },
            ethereum: { usd: 0, ngn: 0 },
        };
    }
};