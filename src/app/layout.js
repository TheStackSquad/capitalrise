//src/app/layout.js

import Providers from "@/app/provider";
import Dropdown from "@/components/motion/dropdown";
import { CalculationProvider } from '@/context/calculationContext';
import "@/app/globals.css";

export const metadata = {
  title: "Capital Rise - Asset Growth Calculator & Financial News",
  description:
    "Track asset growth with our smart calculator and stay updated with financial news. Capital Rise helps you forecast your wealth with ease.",
  keywords: "finance, investment, asset growth, financial news, wealth calculator",
  author: "Capital Rise Team",
  robots: "index, follow",
  openGraph: {
    title: "Capital Rise - Asset Growth Calculator & Financial News",
    description:
      "Track asset growth with our smart calculator and stay updated with financial news.",
    url: "https://capitalrise.app",
    type: "website",
    images: [
      {
        url: "https://capitalrise.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Capital Rise Banner",
      },
    ],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <Dropdown />
          {children}
        </Providers>
      </body>
    </html>
  );
}
