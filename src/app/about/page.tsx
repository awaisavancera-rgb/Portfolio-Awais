"use client";

import { AboutHero } from "@/components/AboutHero";
import { AboutBio } from "@/components/AboutBio";
import { AboutFeaturedWorks } from "@/components/AboutFeaturedWorks";
import { AboutExperience } from "@/components/AboutExperience";
import { Footer } from "@/components/Footer";
import styles from "./about.module.css";

export default function AboutPage() {
    return (
        <main className={styles.aboutPageContainer}>
            <div className={styles.mainContent}>
                {/* Chunk 1: About Hero / Intro matching Palmer Framer template */}
                <AboutHero brandName="About Awais" />

                {/* Chunk 2: Bio & Tech Stack Grid (Completely isolated duplicate from Home page) */}
                <AboutBio />

                {/* Chunk 3: Featured Works Marquee & 2-by-2 GSAP Slider */}
                <AboutFeaturedWorks />

                {/* Chunk 4: Experience / Practice with metaBar & white strip */}
                <AboutExperience />
            </div>
            <Footer />
        </main>
    );
}



