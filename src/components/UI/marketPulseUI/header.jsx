// src/components/UI/marketPulseUI/Header.jsx
const Header = () => {
    return (
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[var(--text)] dark:text-[var(--primary)]">
                MarketPulse
            </h1>
            <p className="text-lg text-[var(--text)] dark:text-[var(--text)]">
                Track Exchange Rates and Crypto Prices in Real-Time
            </p>
        </div>
    );
};

export default Header;