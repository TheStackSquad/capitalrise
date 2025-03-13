//src/context/navbar-context

"use client";

import { createContext, useContext, useEffect, useState } from "react";

const NavbarContext = createContext();


export const NavbarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(() => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem("navbarOpen")) || false;
        }
        return false;
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("navbarOpen", JSON.stringify(isOpen));
        }
    }, [isOpen]);

    const toggleNavbar = () => {
        setIsOpen((prev) => !prev);
        if (process.env.NODE_ENV === "development") {
            console.log("Navbar state changed:", !isOpen);
        }
    };

    return (
        <NavbarContext.Provider value={{ isOpen, toggleNavbar }}>
            {children}
        </NavbarContext.Provider>
    );
};

export const useNavbar = () => useContext(NavbarContext);

