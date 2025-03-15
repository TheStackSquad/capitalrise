//src/app/layout.js

import Providers from "@/app/provider";
import Dropdown from "@/components/motion/dropdown";
import "@/app/globals.css";

export const metadata = {
  title: "Capital Rise - Asset Growth Calculator & Financial News",
  description: "Track asset growth with our smart calculator and stay updated with financial news. Capital Rise helps you forecast your wealth with ease.",
  keywords: "finance, investment, asset growth, financial news, wealth calculator",
  author: "Capital Rise Team",
  robots: "index, follow",
  openGraph: {
    title: "Capital Rise - Asset Growth Calculator & Financial News",
    description: "Track asset growth with our smart calculator and stay updated with financial news.",
    url: "https://capitalrise.vercel.app",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dobwoeo5p/image/upload/f_auto,q_auto,w_1200,h_630/v1742068124/capitalRise_binoie.jpg", // Optimized Cloudinary URL
        width: 1200,
        height: 630,
        alt: "Capital Rise Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image", // Use "summary_large_image" for images
    title: "Capital Rise - Asset Growth Calculator & Financial News",
    description: "Track asset growth with our smart calculator and stay updated with financial news.",
    images: ["https://res.cloudinary.com/dobwoeo5p/image/upload/f_auto,q_auto,w_1200,h_630/v1742068124/capitalRise_binoie.jpg"], // Optimized Cloudinary URL
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
