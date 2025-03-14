//src/app/page.jsx

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/calculator');
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
      >
        {/* Background Layer */}
        <div className="absolute inset-0 bg-gradient-radial dark:bg-gradient-dark light:bg-gradient-light animate-gradient-move"></div>

        {/* Title Animation */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 10,
            delay: 0.2,
          }}
          className="relative text-6xl font-bold font-spacegrotest-bold mb-4 
                     text-blue dark:text-yellow-400 light:text-blue-900"
        >
          Capital Rise
        </motion.h1>

        {/* Tagline Animation */}
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 10,
            delay: 0.5,
          }}
          className="relative text-xl font-robotoslab-medium 
                     text-gray-blue dark:text-yellow-400 light:text-blue-700"
        >
          Let’s grow your wealth, one calculation at a time!
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default HomePage;

