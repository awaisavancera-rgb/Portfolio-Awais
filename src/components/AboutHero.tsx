"use client";

import React, { useRef } from "react";
import styles from "./aboutHero.module.css";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

interface AboutHeroProps {
    brandName?: string;
}

export function AboutHero({ brandName = "Akihiko™" }: AboutHeroProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    // 3D tilt physics for the video card (matches Framer's interactive feel)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 280, damping: 25 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(xPct);
        mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const stripCategories = [
        "Art Direction",
        "Branding",
        "Strategy",
        "Web Design"
    ];

    return (
        <section className={styles.heroSection}>
            {/* Top Row: Heading on Left, 3D Video on Right */}
            <div className={styles.topRow}>
                <div className={styles.headingBlock}>
                    <motion.div 
                        className={styles.lineWrapper}
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className={styles.headline}>Pattern Dimensions</h2>
                    </motion.div>

                    <motion.div 
                        className={styles.lineWrapper}
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className={styles.headline}>and Moments that</h2>
                    </motion.div>

                    <motion.div 
                        className={styles.lineWrapper}
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className={styles.headline}>Connect and Leave a</h2>
                    </motion.div>

                    <motion.div 
                        className={styles.lineWrapper}
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className={styles.headline}>
                            Bold <span className={styles.japaneseText}>イメージ.</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Right: Floating 3D Video Card */}
                <div 
                    ref={cardRef}
                    className={styles.reelWrapper}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <motion.div 
                        className={styles.reelCard}
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: "preserve-3d"
                        }}
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className={styles.videoContainer}>
                            <iframe
                                src="https://player.vimeo.com/video/704745692?autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0"
                                frameBorder="0"
                                allow="autoplay; fullscreen"
                                allowFullScreen
                                className={styles.vimeoIframe}
                                title="Nike Reel Video"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Middle: Horizontal White Banner Strip */}
            <motion.div 
                className={styles.whiteStripContainer}
                initial={{ opacity: 0, scaleX: 0.95 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className={styles.whiteStripInner}>
                    {stripCategories.map((item, idx) => (
                        <div key={idx} className={styles.stripCol}>
                            <span className={styles.stripText}>{item}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Bottom: Mega Brand Title with Top & Bottom Dividers */}
            <div className={styles.bottomBrandSection}>
                <div className={styles.dividerLine} />
                <div className={styles.megaTitleWrapper}>
                    <motion.h1 
                        className={styles.megaBrandTitle}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {brandName}
                    </motion.h1>
                </div>
                <div className={styles.dividerLine} />
            </div>
        </section>
    );
}

