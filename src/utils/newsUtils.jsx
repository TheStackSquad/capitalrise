// src/utils/newsUtils.jsx

// Static fallback data
const staticNews = [
    {
        title: 'Market Recap: Tech Stocks Surge',
        description: 'Latest developments in the tech sector show promising growth trends...',
        urlToImage: '/placeholder-image.jpg',
        publishedAt: new Date().toISOString(),
    },
    {
        title: 'Investment Strategy: Compound Growth',
        description: 'Learn how to maximize your returns with these compound growth strategies...',
        urlToImage: '/placeholder-image.jpg',
        publishedAt: new Date().toISOString(),
    },
];

// Fetch news with caching
export const fetchNews = async (category = 'business') => {
    const cacheKey = `news-${category}`;
    const cachedData = localStorage.getItem(cacheKey);

    // Check if cached data exists and is not expired
    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const isCacheValid = Date.now() - timestamp < 60 * 60 * 1000; // 1 hour TTL
        if (isCacheValid) {
            return data; // Serve cached data
        }
    }

    try {
        const response = await fetch(`/api/news?source=${category}`);
        const result = await response.json();

        // Cache the new data
        localStorage.setItem(cacheKey, JSON.stringify({ data: result.data, timestamp: Date.now() }));

        return result.data;
    } catch (error) {
        console.error('Error fetching news, serving static data:', error);
        // Fallback to static data
        return staticNews;
    }
};

// Fetch crypto news with caching
export const fetchCryptoNews = async () => {
    return fetchNews('crypto');
};

// Fetch Guardian news with caching
export const fetchGuardianNews = async () => {
    return fetchNews('guardian');
};

// Fetch GNews with caching
export const fetchGNews = async () => {
    return fetchNews('gnews');
};

// Fetch Alpha Vantage news with caching
export const fetchAlphaVantageNews = async () => {
    return fetchNews('alphavantage');
};

// Debounced search function
let timeout;
export const debouncedSearch = (callback, delay = 500) => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
};