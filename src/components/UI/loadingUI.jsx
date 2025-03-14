// src/components/UI/loadingUI.jsx
'use client';

import { motion } from 'framer-motion';

const LoadingUI = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary to-secondary">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                }}
                className="text-6xl font-bold text-white font-spacegrotest-bold"
            >
                Capital Rise
            </motion.div>
        </div>
    );
};

export default LoadingUI;