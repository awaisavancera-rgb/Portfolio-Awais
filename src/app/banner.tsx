"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Twitter, Instagram, Youtube, ArrowUpRight } from "lucide-react";
import styles from "./banner.module.css";
import { LiquidMetalButton } from "@/components/LiquidMetalButton";
import { RollingText } from "@/components/RollingText";
import { Magnetic } from "@/components/Magnetic";

export default function Banner() {
    const glowRef = useRef<HTMLDivElement>(null);
    const [activeLine, setActiveLine] = useState(0);
    const [hidden, setHidden] = useState(false);
    const [isCompact, setIsCompact] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        if (latest > 50) {
            setIsCompact(true);
        } else {
            setIsCompact(false);
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveLine((prev) => (prev + 1) % 4);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(glowRef.current, {
                scale: 1.2,
                opacity: 0.6,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.banner}>
            <motion.nav
                className={`${styles.nav} ${isCompact ? styles.navCompact : ""}`}
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: -100, opacity: 0 }
                }}
                animate={hidden ? "hidden" : "visible"}
                initial={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                    maxWidth: isCompact ? "31.5vw" : "91.5vw",
                    padding: isCompact ? "0.5vw 1vw" : "0.75vw 2vw",
                }}
            >
                <div className={styles.navLogo}>
                    <div className={styles.logoImageWrapper}>
                        <Image
                            src="/Whisk_74972c1328c633aa89d4f1ae1bf892a9eg.png"
                            alt="Logo"
                            width={40}
                            height={40}
                            priority
                        />
                    </div>
                    <span>Muhammad Awais</span>
                </div>

                <AnimatePresence mode="wait">
                    {!isCompact ? (
                        <motion.div
                            key="full-menu"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            className={styles.navMenus}
                        >
                            <div className={`${styles.navItem} ${styles.navItemActive}`}>Home</div>
                            <div className={styles.navItem}>About</div>
                            <div className={styles.navItem}>Work / Portfolio</div>
                            <div className={styles.navItem}>Blog</div>
                            <div className={styles.navItem}>Contact</div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="hamburger"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90, transition: { duration: 0.2 } }}
                            className={styles.hamburger}
                            style={{ display: "flex" }} // Override CSS display:none
                        >
                            <span />
                            <span />
                            <span />
                        </motion.div>
                    )}
                </AnimatePresence>

                <LiquidMetalButton label="See Projects" />
            </motion.nav>

            <div className={styles.mainContent}>
                {/* Glow Background */}
                <div className={styles.glowContainer}>
                    <div ref={glowRef} className={styles.glowCircle} style={{ width: '400px', height: '400px' }} />
                    <div className={styles.glowCircle} style={{ width: '300px', height: '300px', opacity: 0.2 }} />
                </div>

                {/* Decorative Background Lines */}
                <div className={styles.decorativeLines}>
                    {[1, 2, 3, 4].map((i, index) => (
                        <div
                            key={i}
                            className={`${styles.line} ${activeLine === index ? styles.lineShining : ""}`}
                            style={{
                                width: `${i * 220}px`,
                                height: `${i * 220}px`,
                                bottom: `0px`,
                                zIndex: 1,
                                opacity: 0.4, // Increased base visibility
                            }}
                        >
                            {/* Shining Particle following the line - Single Slow Star */}
                            {[0].map((startDegree) => (
                                <motion.div
                                    key={startDegree}
                                    style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
                                    initial={{ rotate: startDegree }}
                                    animate={{ rotate: startDegree + 360 }}
                                    transition={{
                                        duration: 12 + i * 4, // Significantly slower rotation
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                >
                                    <div className={styles.particle} />
                                </motion.div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Person Image Container - Moved out of headline for better control */}
                <div className={styles.personImageContainer}>
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                        className={styles.personImageInner}
                    >
                        <Image
                            src="/PRICING.png"
                            alt="Nolan Blake"
                            fill
                            priority
                            style={{ objectFit: 'contain', objectPosition: 'bottom' }}
                        />
                    </motion.div>
                </div>

                <div className={styles.headlineContainer}>
                    <motion.h1
                        className={styles.headline}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        Muhammad Awais
                    </motion.h1>
                </div>

                <div className={styles.sideContent}>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                    >
                        I create interfaces that blend function with emotion, crafting digital experiences that feel intuitive, seamless, and meaningful.
                    </motion.p>
                    <div className={styles.socials}>
                        <div className={styles.socialIcon}><Twitter size={18} /></div>
                        <div className={styles.socialIcon}><Instagram size={18} /></div>
                        <div className={styles.socialIcon}><Youtube size={18} /></div>
                    </div>
                </div>

                <div className={styles.footerCTA}>
                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                    >
                        Merging design thinking with human insight to create digital experiences that don&apos;t just look great — they perform effortlessly.
                    </motion.p>
                    <Magnetic>
                        <motion.button
                            className="btn-talk"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <RollingText text="Let's Talk" />
                            <span className="icon-circle">
                                <ArrowUpRight size={16} />
                            </span>
                        </motion.button>
                    </Magnetic>
                </div>
            </div>
        </section >
    );
}
