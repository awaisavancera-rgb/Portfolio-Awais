"use client"

import { PortfolioBanner } from "@/components/PortfolioBanner";
import { AllWorks } from "@/components/AllWorks";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";

export default function PortfolioPage() {
    return (
        <main id="main-content" style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#000', minHeight: '100vh' }}>
            <PortfolioBanner />
            <div style={{ position: 'relative', zIndex: 20 }}>
                <AllWorks />
                <FaqSection />
            </div>
            <Footer />
        </main>
    );
}
