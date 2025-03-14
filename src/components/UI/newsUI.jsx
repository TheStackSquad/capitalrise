'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchNews, fetchCryptoNews, fetchGuardianNews, fetchGNews, fetchAlphaVantageNews } from '@/utils/newsUtils';
import LoadingUI from '@/components/UI/loadingUI';

const NewsUI = () => {
    const [news, setNews] = useState([]);
    const [category, setCategory] = useState('business');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadNews = async () => {
            setIsLoading(true);
            let data;
            switch (category) {
                case 'crypto':
                    data = await fetchCryptoNews();
                    break;
                case 'guardian':
                    data = await fetchGuardianNews();
                    break;
                case 'gnews':
                    data = await fetchGNews();
                    break;
                case 'alphavantage':
                    data = await fetchAlphaVantageNews();
                    break;
                default:
                    data = await fetchNews(category);
            }
            setNews(data);
            setIsLoading(false);
        };
        loadNews();
    }, [category]);

    if (isLoading) {
        return <LoadingUI />;
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="p-6 bg-[var(--background)] min-h-screen"
            >
                <h1 className="text-3xl font-bold text-center mb-8 text-[var(--text)] dark:text-[var(--primary)]">
                    Financial Insights
                </h1>
                {/* Filter Options */}
                <div className="flex flex-wrap gap-4 justify-center mb-8">
                    {['Stocks', 'Crypto', 'Economy', 'Investing'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setCategory(filter.toLowerCase())}
                            className={`px-4 py-2 rounded-full transition-colors ${category === filter.toLowerCase()
                                ? 'bg-[var(--primary)] text-[var(--primary-foreground)] dark:bg-[var(--primary)] dark:text-[var(--primary-foreground)]'
                                : 'bg-[var(--card)] text-[var(--text)] dark:bg-[var(--primary)] dark:text-[var(--primary-foreground)] dark:bg-opacity-80'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
                {/* News Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {news.map((article, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[var(--card)] rounded-lg
                            shadow-md overflow-hidden
                            hover:shadow-lg transition-shadow
                            dark:bg-[var(--primaryAlte)] dark:bg-opacity-20 dark:hover:bg-opacity-30 dark:border dark:border-[var(--primary)] dark:border-opacity-20"
                        >
                            <img
                                src={article.urlToImage || '/placeholder-image.jpg'}
                                alt={article.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h2 className="text-xl font-bold font-jetbrains mb-2 text-[var(--text)] dark:text-[var(--primary)]">
                                    {article.title}
                                </h2>
                                <p className="text-[var(--text)] font-robotoSlab mb-4 dark:text-[var(--text)] dark:text-opacity-90">
                                    {article.description}
                                </p>
                                <p className="text-sm text-[var(--text)] font-jetbrains opacity-70 dark:text-[var(--text)] dark:text-opacity-70">
                                    {new Date(article.publishedAt).toLocaleDateString()}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default NewsUI;