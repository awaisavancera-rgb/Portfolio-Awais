"use client"

import { GalleryBanner } from "@/components/GalleryBanner";
import { Footer } from "@/components/Footer";

export default function BlogPage() {
    return (
        <main id="main-content" style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#000', minHeight: '100vh' }}>
            <GalleryBanner />
            <div style={{ position: 'relative', zIndex: 20, padding: '100px 24px', color: 'white', maxWidth: '1480px', margin: '0 auto', width: '100%' }}>
                <h1 style={{ fontSize: '10vw', letterSpacing: '-0.05em', lineHeight: 1, margin: 0, paddingBottom: '40px' }}>Blog</h1>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1.2rem', fontFamily: 'Inter, sans-serif' }}>New articles coming soon...</p>
            </div>
            <Footer />
        </main>
    );
}
