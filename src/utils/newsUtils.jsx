// src/utils/newsUtils.jsx
const NEWSAPI_KEY = process.env.NEXT_PUBLIC_NEWSAPI_KEY;
const CRYPTOCOMPARE_KEY = process.env.NEXT_PUBLIC_CRYPTOCOMPARE_KEY;
const GUARDIAN_KEY = process.env.NEXT_PUBLIC_GUARDIAN_KEY;
const GNEWS_KEY = process.env.NEXT_PUBLIC_GNEWS_KEY;
const ALPHAVANTAGE_KEY = process.env.NEXT_PUBLIC_ALPHAVANTAGE_KEY;

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
        const response = await fetch(
            `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${NEWSAPI_KEY}`
        );
        const data = await response.json();

        // Cache the new data
        localStorage.setItem(cacheKey, JSON.stringify({ data: data.articles, timestamp: Date.now() }));

        return data.articles;
    } catch (error) {
        console.error('Error fetching news, serving static data:', error);
        return staticNews; // Fallback to static data
    }
};

// Fetch crypto news with caching
export const fetchCryptoNews = async () => {
    const cacheKey = 'crypto-news';
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const isCacheValid = Date.now() - timestamp < 60 * 60 * 1000; // 1 hour TTL
        if (isCacheValid) {
            return data; // Serve cached data
        }
    }

    try {
        const response = await fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');
        const data = await response.json();

        // Cache the new data
        localStorage.setItem(cacheKey, JSON.stringify({ data: data.Data, timestamp: Date.now() }));

        return data.Data;
    } catch (error) {
        console.error('Error fetching crypto news, serving static data:', error);
        return staticNews; // Fallback to static data
    }
};

// Fetch Guardian news with caching
export const fetchGuardianNews = async () => {
    const cacheKey = 'guardian-news';
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const isCacheValid = Date.now() - timestamp < 60 * 60 * 1000; // 1 hour TTL
        if (isCacheValid) {
            return data; // Serve cached data
        }
    }

    try {
        const response = await fetch(
            `https://content.guardianapis.com/search?api-key=${GUARDIAN_KEY}`
        );
        const data = await response.json();

        // Cache the new data
        localStorage.setItem(cacheKey, JSON.stringify({ data: data.response.results, timestamp: Date.now() }));

        return data.response.results;
    } catch (error) {
        console.error('Error fetching Guardian news, serving static data:', error);
        return staticNews; // Fallback to static data
    }
};

// Fetch GNews with caching
export const fetchGNews = async (category = 'general') => {
    const cacheKey = `gnews-${category}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const isCacheValid = Date.now() - timestamp < 60 * 60 * 1000; // 1 hour TTL
        if (isCacheValid) {
            return data; // Serve cached data
        }
    }

    try {
        const response = await fetch(
            `https://gnews.io/api/v4/top-headlines?category=${category}&token=${GNEWS_KEY}`
        );
        const data = await response.json();

        // Cache the new data
        localStorage.setItem(cacheKey, JSON.stringify({ data: data.articles, timestamp: Date.now() }));

        return data.articles;
    } catch (error) {
        console.error('Error fetching GNews, serving static data:', error);
        return staticNews; // Fallback to static data
    }
};

// Fetch Alpha Vantage news with caching
export const fetchAlphaVantageNews = async () => {
    const cacheKey = 'alphavantage-news';
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const isCacheValid = Date.now() - timestamp < 60 * 60 * 1000; // 1 hour TTL
        if (isCacheValid) {
            return data; // Serve cached data
        }
    }

    try {
        const response = await fetch(
            `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${ALPHAVANTAGE_KEY}`
        );
        const data = await response.json();

        // Cache the new data
        localStorage.setItem(cacheKey, JSON.stringify({ data: data.feed, timestamp: Date.now() }));

        return data.feed;
    } catch (error) {
        console.error('Error fetching Alpha Vantage news, serving static data:', error);
        return staticNews; // Fallback to static data
    }
};

// Debounced search function
let timeout;
export const debouncedSearch = (callback, delay = 500) => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
};