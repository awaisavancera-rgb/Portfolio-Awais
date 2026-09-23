"use client";

import { AboutHero } from "@/components/AboutHero";
import { AboutBio } from "@/components/AboutBio";
import { AboutFeaturedWorks } from "@/components/AboutFeaturedWorks";
import { Footer } from "@/components/Footer";
import styles from "./about.module.css";

export default function AboutPage() {
    return (
        <main className={styles.aboutPageContainer}>
            <div className={styles.mainContent}>
                {/* Chunk 1: About Hero / Intro matching Palmer Framer template */}
                <AboutHero brandName="Akihiko™" />

                {/* Chunk 2: Bio & Tech Stack Grid (Completely isolated duplicate from Home page) */}
                <AboutBio />

                {/* Chunk 3: Featured Works Marquee & 2-by-2 GSAP Slider */}
                <AboutFeaturedWorks />

                {/* 
                  Yahan aglay About page ke chunks render hon ge:
                  - Chunk 4: Philosophy / Experience
                  - Chunk 5: Contact / CTA
                */}
            </div>
            <Footer />
        </main>
    );
}



