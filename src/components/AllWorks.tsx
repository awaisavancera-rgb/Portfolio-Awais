"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import styles from './allWorks.module.css';

import { projects } from '@/data/projects';

const ProjectCard = ({ project }: { project: any }) => {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for the cursor
    const mouseXSpring = useSpring(x, { stiffness: 500, damping: 50 });
    const mouseYSpring = useSpring(y, { stiffness: 500, damping: 50 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
    };

    return (
        <Link
            ref={cardRef}
            href={`/work/${project.slug}`}
            className={styles.projectCard}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={styles.imageContainer}>
                {/* Background Image */}
                <div className={styles.bgImageWrapper}>
                    <Image
                        src={project.bgImage}
                        alt={`${project.title} background`}
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized
                    />
                </div>
                {/* Inner Centered Image */}
                <div className={styles.innerImageWrapper}>
                    <Image
                        src={project.innerImage}
                        alt={`${project.title} inner`}
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized
                    />
                </div>
                {/* Hover Banner with Tag */}
                <div className={styles.hoverBanner}>
                    <span className={styles.bannerTag}>{project.tag}</span>
                </div>

                {/* Floating VIEW Button */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        x: mouseXSpring,
                        y: mouseYSpring,
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0.5,
                        pointerEvents: 'none',
                        zIndex: 10,
                    }}
                >
                    <div className={styles.floatingViewBtn}>VIEW</div>
                </motion.div>
            </div>
            <div className={styles.bottomInfo}>
                <div className={styles.textRollWrapper}>
                    <span className={styles.projectTitle}>{project.title}</span>
                    <span className={styles.projectTitleHover}>{project.title}</span>
                </div>
                <div className={styles.textRollWrapper}>
                    <span className={styles.projectCount}>({project.id})</span>
                    <span className={styles.projectCountHover}>({project.id})</span>
                </div>
            </div>
        </Link>
    );
};

const FilterDropdown = ({ label, options, selected, onSelect }: { label: string, options: string[], selected: string, onSelect: (val: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredOptions = options.filter(opt => opt.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className={styles.filterDropdown} onClick={() => setIsOpen(!isOpen)}>
            <div className={styles.filterLabel}>
                {selected === "All" ? `All ${label}s` : selected}
            </div>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
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
                                placeholder={`Search...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={styles.searchInput}
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
                                onClick={(e) => { e.stopPropagation(); onSelect("All"); setIsOpen(false); setSearchQuery(""); }}
                            >
                                All {label}s
                            </div>
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map(opt => (
                                    <div 
                                        key={opt} 
                                        className={styles.filterOption} 
                                        onClick={(e) => { e.stopPropagation(); onSelect(opt); setIsOpen(false); setSearchQuery(""); }}
                                    >
                                        {opt}
                                    </div>
                                ))
                            ) : (
                                <div className={styles.noSearchMatch}>No results</div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export function AllWorks() {
    const [selectedPlatform, setSelectedPlatform] = useState("All");
    const [selectedIndustry, setSelectedIndustry] = useState("All");

    const platforms = ["Shopify", "WordPress", "Wix", "GHL", "Next.js", "React.js", "Custom Website", "Figma Designs", "Framer Website", "Webflow Website"];
    const industries = ["Ecommerce", "Fashion", "Tech/SaaS", "Agency", "Architecture"];

    const filteredProjects = projects.filter(p => {
        const matchPlatform = selectedPlatform === "All" || p.platform === selectedPlatform;
        const matchIndustry = selectedIndustry === "All" || p.industry === selectedIndustry;
        return matchPlatform && matchIndustry;
    });

    return (
        <section className={styles.allWorksSection}>
            <div className={styles.metaBar}>
                <span>© Curated Interfaces</span>
                <span>(WDX® — 02)</span>
                <span>Digital Designer</span>
            </div>

            <div className={styles.container}>
                {/* Top Heading */}
                <div className={styles.headingWrapper}>
                    <div className={styles.headingContent}>
                        <h1 className={styles.headingText}>
                            All Works
                        </h1>
                        <div className={styles.headingNumber}>
                            <h3>({filteredProjects.length})</h3>
                        </div>
                    </div>

                    <div className={styles.introAndFilters}>
                        <div className={styles.introText}>
                            Every project is a chance to blend design and development, shaping bold interactive ideas into <strong>sleek digital realities — built with</strong> intent, speed, and visual clarity that attracts lot of peoples.
                        </div>

                        {/* Filters Container */}
                        <div className={styles.filtersContainer}>
                            <FilterDropdown label="Platform" options={platforms} selected={selectedPlatform} onSelect={setSelectedPlatform} />
                            <FilterDropdown label="Industry" options={industries} selected={selectedIndustry} onSelect={setSelectedIndustry} />
                        </div>
                    </div>
                </div>

                {/* Right Scrollable Cards */}
                <div className={styles.cardsWrapper}>
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <ProjectCard project={project} />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={styles.noResults}
                            >
                                No projects match the selected filters.
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
