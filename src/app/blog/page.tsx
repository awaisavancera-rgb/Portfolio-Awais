"use client";

import { useState } from "react";
import { GalleryBanner } from "@/components/GalleryBanner";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./blog.module.css";

const blogPosts = [
    {
        id: "01",
        tag: "Design & Interaction",
        topic: "Design",
        date: "May 2024",
        readTime: "5 min read",
        timeCategory: "5+ min",
        title: "The Evolution of Micro-Interactions in High-End Digital Experiences",
        excerpt: "Exploring how tactile feedback, spring physics, and subtle GSAP timelines transform standard layouts into memorable brand statements.",
        status: "Upcoming"
    },
    {
        id: "02",
        tag: "AI & Engineering",
        topic: "AI / Tech",
        date: "June 2024",
        readTime: "7 min read",
        timeCategory: "5+ min",
        title: "Architecting Autonomous Voice Agents with Self-Correcting Execution Loops",
        excerpt: "A practical guide to building sub-500ms latency conversational bots integrated with enterprise CRMs and real-time knowledge graphs.",
        status: "Upcoming"
    },
    {
        id: "03",
        tag: "Frontend Performance",
        topic: "Engineering",
        date: "July 2024",
        readTime: "4 min read",
        timeCategory: "Under 5 min",
        title: "Next.js App Router: Eliminating Layout Shifts and Composite Stutter",
        excerpt: "Techniques for buttery smooth 60fps animations across complex multi-page portfolios while maintaining perfect Google Lighthouse scores.",
        status: "Upcoming"
    },
    {
        id: "04",
        tag: "Creative Direction",
        topic: "Design",
        date: "August 2024",
        readTime: "6 min read",
        timeCategory: "5+ min",
        title: "Typography as Interface: The Power of Monospaced and Editorial Type",
        excerpt: "How pairing minimalist monospace metadata with massive display type creates modern, award-winning visual hierarchy.",
        status: "Upcoming"
    }
];

const FilterDropdown = ({
    label,
    options,
    selected,
    onSelect,
}: {
    label: string;
    options: string[];
    selected: string;
    onSelect: (val: string) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredOptions = options.filter((opt) =>
        opt.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div
            className={styles.filterDropdown}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className={styles.filterLabel}>
                {selected === "All" ? `All ${label}s` : selected}
            </div>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </motion.div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.filterMenu}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.searchInputWrapper}>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={styles.searchInput}
                                autoFocus
                            />
                        </div>
                        <div
                            className={styles.filterOptionsList}
                            data-lenis-prevent="true"
                            onWheel={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                        >
                            <div
                                className={styles.filterOption}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSelect("All");
                                    setIsOpen(false);
                                    setSearchQuery("");
                                }}
                            >
                                All {label}s
                            </div>
                            {filteredOptions.map((opt, i) => (
                                <div
                                    key={i}
                                    className={styles.filterOption}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelect(opt);
                                        setIsOpen(false);
                                        setSearchQuery("");
                                    }}
                                >
                                    {opt}
                                </div>
                            ))}
                            {filteredOptions.length === 0 && (
                                <div className={styles.noSearchMatch}>No match</div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function BlogPage() {
    const [selectedTopic, setSelectedTopic] = useState("All");
    const [selectedTime, setSelectedTime] = useState("All");

    const topicOptions = Array.from(new Set(blogPosts.map((p) => p.topic)));
    const timeOptions = Array.from(new Set(blogPosts.map((p) => p.timeCategory)));

    const filteredPosts = blogPosts.filter((post) => {
        const matchesTopic = selectedTopic === "All" || post.topic === selectedTopic;
        const matchesTime = selectedTime === "All" || post.timeCategory === selectedTime;
        return matchesTopic && matchesTime;
    });

    return (
        <main id="main-content" className={styles.blogPage}>
            {/* Interactive Hero Banner */}
            <GalleryBanner title="Blog©" />

            {/* Meta bar */}
            <div className={styles.metaBar}>
                <span>© Articles & Insights</span>
                <span>(WDX® — 03)</span>
                <span>Editorial Thoughts</span>
            </div>

            {/* Articles Section */}
            <section className={styles.contentSection}>
                {/* Heading & Filters layout matching All Works */}
                <div className={styles.headingWrapper}>
                    <div className={styles.headingContent}>
                        <h1 className={styles.headingText}>Thoughts & Code</h1>
                        <div className={styles.headingNumber}>
                            <h3>({filteredPosts.length})</h3>
                        </div>
                    </div>

                    <div className={styles.introAndFilters}>
                        <div className={styles.introText}>
                            Every article is an exploration of code and design, shaping bold
                            interactive ideas into <strong>sleek digital realities — crafted with</strong> intent,
                            speed, and visual clarity that inspires.
                        </div>

                        <div className={styles.filtersContainer}>
                            <FilterDropdown
                                label="Topic"
                                options={topicOptions}
                                selected={selectedTopic}
                                onSelect={setSelectedTopic}
                            />
                            <FilterDropdown
                                label="Reading Time"
                                options={timeOptions}
                                selected={selectedTime}
                                onSelect={setSelectedTime}
                            />
                        </div>
                    </div>
                </div>

                {/* Articles Grid */}
                <div className={styles.articlesGrid}>
                    {filteredPosts.map((post) => (
                        <div key={post.id} className={styles.articleCard}>
                            <div className={styles.articleTop}>
                                <span className={styles.tag}>{post.tag}</span>
                                <span className={styles.metaInfo}>
                                    {post.date} • {post.readTime}
                                </span>
                            </div>

                            <h3 className={styles.articleTitle}>{post.title}</h3>
                            <p className={styles.articleExcerpt}>{post.excerpt}</p>

                            <div className={styles.articleBottom}>
                                <span className={styles.statusBadge}>{post.status}</span>
                                <div className="primary-btn">
                                    <span className="btnText">READ ARTICLE</span>
                                    <div className="btnIconCircle">
                                        <div className="arrowTrack">
                                            <ArrowRight className="arrowIconPrimary" size={16} />
                                            <ArrowRight className="arrowIconSecondary" size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredPosts.length === 0 && (
                        <div className={styles.noArticles}>
                            No articles found matching your filter selection.
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
