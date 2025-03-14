// src/app/api/news/route.js
import { NextResponse } from 'next/server';

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

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get('source') || 'business';

    try {
        let data;

        switch (source) {
            case 'business':
                const newsResponse = await fetch(
                    `https://newsapi.org/v2/top-headlines?category=${source}&apiKey=${process.env.NEWSAPI_KEY}`
                );
                const newsData = await newsResponse.json();
                data = newsData.articles;
                break;

            case 'crypto':
                const cryptoResponse = await fetch(
                    'https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=' + process.env.CRYPTOCOMPARE_KEY
                );
                const cryptoData = await cryptoResponse.json();
                data = cryptoData.Data;
                break;

            case 'guardian':
                const guardianResponse = await fetch(
                    `https://content.guardianapis.com/search?api-key=${process.env.GUARDIAN_KEY}`
                );
                const guardianData = await guardianResponse.json();
                data = guardianData.response.results;
                break;

            case 'gnews':
                const gnewsResponse = await fetch(
                    `https://gnews.io/api/v4/top-headlines?category=general&token=${process.env.GNEWS_KEY}`
                );
                const gnewsData = await gnewsResponse.json();
                data = gnewsData.articles;
                break;

            case 'alphavantage':
                const alphaResponse = await fetch(
                    `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${process.env.ALPHAVANTAGE_KEY}`
                );
                const alphaData = await alphaResponse.json();
                data = alphaData.feed;
                break;

            default:
                const defaultResponse = await fetch(
                    `https://newsapi.org/v2/top-headlines?category=business&apiKey=${process.env.NEWSAPI_KEY}`
                );
                const defaultData = await defaultResponse.json();
                data = defaultData.articles;
        }

        return NextResponse.json({ data });
    } catch (error) {
        console.error('API route error:', error);
        return NextResponse.json({ data: staticNews });
    }
}