"use client";

import { GalleryBanner } from "@/components/GalleryBanner";
import { Footer } from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";
import styles from "./blog.module.css";

const blogPosts = [
    {
        id: "01",
        tag: "Design & Interaction",
        date: "May 2024",
        readTime: "5 min read",
        title: "The Evolution of Micro-Interactions in High-End Digital Experiences",
        excerpt: "Exploring how tactile feedback, spring physics, and subtle GSAP timelines transform standard layouts into memorable brand statements.",
        status: "Upcoming"
    },
    {
        id: "02",
        tag: "AI & Engineering",
        date: "June 2024",
        readTime: "7 min read",
        title: "Architecting Autonomous Voice Agents with Self-Correcting Execution Loops",
        excerpt: "A practical guide to building sub-500ms latency conversational bots integrated with enterprise CRMs and real-time knowledge graphs.",
        status: "Upcoming"
    },
    {
        id: "03",
        tag: "Frontend Performance",
        date: "July 2024",
        readTime: "4 min read",
        title: "Next.js App Router: Eliminating Layout Shifts and Composite Stutter",
        excerpt: "Techniques for buttery smooth 60fps animations across complex multi-page portfolios while maintaining perfect Google Lighthouse scores.",
        status: "Upcoming"
    },
    {
        id: "04",
        tag: "Creative Direction",
        date: "August 2024",
        readTime: "6 min read",
        title: "Typography as Interface: The Power of Monospaced and Editorial Type",
        excerpt: "How pairing minimalist monospace metadata with massive display type creates modern, award-winning visual hierarchy.",
        status: "Upcoming"
    }
];

export default function BlogPage() {
    return (
        <main id="main-content" className={styles.blogPage}>
            {/* Interactive Hero Banner with floating editorial items */}
            <GalleryBanner title="Blog©" />

            {/* Meta bar */}
            <div className={styles.metaBar}>
                <span>© Articles & Insights</span>
                <span>(WDX® — 03)</span>
                <span>Editorial Thoughts</span>
            </div>

            {/* Articles Section */}
            <section className={styles.contentSection}>
                <div className={styles.headingWrapper}>
                    <p className={styles.subTitle}>Selected Writings</p>
                    <h2 className={styles.sectionTitle}>Thoughts & Code</h2>
                </div>

                <div className={styles.articlesGrid}>
                    {blogPosts.map((post) => (
                        <div key={post.id} className={styles.articleCard}>
                            <div className={styles.articleTop}>
                                <span className={styles.tag}>{post.tag}</span>
                                <span className={styles.metaInfo}>{post.date} • {post.readTime}</span>
                            </div>

                            <h3 className={styles.articleTitle}>{post.title}</h3>
                            <p className={styles.articleExcerpt}>{post.excerpt}</p>

                            <div className={styles.articleBottom}>
                                <span className={styles.statusBadge}>{post.status}</span>
                                <div className={styles.readMore}>
                                    <span>Read</span>
                                    <div className={styles.cardIcon}>
                                        <ArrowUpRight size={14} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
