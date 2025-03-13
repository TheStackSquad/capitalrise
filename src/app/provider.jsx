//src/app/provider.jsx

"use client";

import { ThemeProvider } from "@/context/themeContext";
import { NavbarProvider } from "@/context/navbar-context";
import { SafeHydration } from "@/components/safeHydration";

export default function Providers({ children }) {
  return (
    <SafeHydration>
      <ThemeProvider>
        <NavbarProvider>{children}</NavbarProvider>
      </ThemeProvider>
    </SafeHydration>
  );
}
