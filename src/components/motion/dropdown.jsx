//src/components/motion/dropdown.jsx
"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/themeContext";
import { useNavbar } from "@/context/navbar-context";

const Dropdown = () => {
    const { isOpen, toggleNavbar, closeNavbar } = useNavbar();
    const { theme, toggleTheme } = useTheme();
    const dropdownRef = useRef(null);

    // Close dropdown if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeNavbar();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [closeNavbar]);

    return (
        <header className="sticky top-0 bg-primary text-primary-foreground p-4 flex items-center justify-between shadow-md">
            <h1 className="text-2xl font-bold">Capital Rise</h1>

            {/* Navigation and Icons Container */}
            <div className="flex items-center space-x-6">
                {/* Large & Medium Screens Navigation */}
                <nav className="hidden md:flex space-x-6">
                    <a href="/news" className="hover:bg-accent p-2 rounded-md">News</a>
                    <a href="/calculator" className="hover:bg-accent p-2 rounded-md">Calculator</a>
                    <a href="/about-us" className="hover:bg-accent p-2 rounded-md">About</a>
                </nav>

                {/* Theme Toggle */}
                <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-accent">
                    {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Mobile Dropdown */}
                <div className="md:hidden relative" ref={dropdownRef}>
                    <button onClick={toggleNavbar} className="p-2 rounded-md hover:bg-accent">
                        <Menu size={24} />
                    </button>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute right-0 mt-2 w-40 bg-primary text-primary-foreground shadow-lg rounded-md p-2 space-y-2"
                            >
                                <a href="/news" className="block hover:bg-accent p-2 rounded-md">News</a>
                                <a href="/calculator" className="block hover:bg-accent p-2 rounded-md">Calculator</a>
                                <a href="/about-us" className="block hover:bg-accent p-2 rounded-md">About</a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export default Dropdown;

