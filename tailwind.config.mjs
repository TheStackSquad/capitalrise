export default {
    darkMode: "class",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                text: "var(--text)",
                primary: "var(--primary)",
                "primary-foreground": "var(--primary-foreground)", // Add this
            },
            fontFamily: {
                roboto: ["var(--font-robotoslab)"],
            },
        },
    },
    plugins: [],
};