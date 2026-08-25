"use client"

import { GalleryBanner } from "@/components/GalleryBanner";
import { AllWorks } from "@/components/AllWorks";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";

export default function PortfolioPage() {
    return (
        <main id="main-content" style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#000', minHeight: '100vh' }}>
            <GalleryBanner />
            <div style={{ position: 'relative', zIndex: 20 }}>
                <AllWorks />
                <FaqSection />
            </div>
            <Footer />
        </main>
    );
}
