// src/app/provider.jsx
"use client";
import { ThemeProvider } from "@/context/themeContext";
import { NavbarProvider } from "@/context/navbar-context";
import { CalculationProvider } from '@/context/calculationContext';
import { SafeHydration } from "@/components/safeHydration";
import '@/app/globals.css';

export default function Providers({ children }) {
  return (
    <SafeHydration>
      <ThemeProvider>
        <NavbarProvider>
          <CalculationProvider>
            {children}
          </CalculationProvider>
        </NavbarProvider>
      </ThemeProvider>
    </SafeHydration>
  );
}
