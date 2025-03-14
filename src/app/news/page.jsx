// src/components/UI/newsUI.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchNews, fetchCryptoNews } from '@/utils/newsUtils';

const NewsUI = () => {
    const [news, setNews] = useState([]);
    const [category, setCategory] = useState('business');

    useEffect(() => {
        const loadNews = async () => {
            let data;
            if (category === 'crypto') {
                data = await fetchCryptoNews();
            } else {
                data = await fetchNews(category);
            }
            setNews(data);
        };
        loadNews();
    }, [category]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="p-6"
            >
                {/* Title */}
                <h1 className="text-3xl font-bold text-center mb-8 text-primary">
                    Financial Insights
                </h1>

                {/* Filter Options */}
                <div className="flex gap-4 justify-center mb-8">
                    {['Stocks', 'Crypto', 'Markets', 'Tips'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setCategory(filter.toLowerCase())}
                            className={`px-4 py-2 rounded-full font-semibold transition-colors
                        ${category === filter.toLowerCase()
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-transparent border border-primary text-primary'
                                } hover:bg-primary hover:text-primary-foreground`}
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
                            className="bg-card text-card-foreground rounded-lg shadow-md border dark:border-border overflow-hidden"
                        >
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                                <p className="text-gray-400 mb-4">{article.description}</p>
                                <p className="text-sm text-gray-500 dark:text-yellow-400">
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