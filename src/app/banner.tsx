"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Twitter, Instagram, Youtube, ArrowRight } from "lucide-react";
import styles from "./banner.module.css";
import { LiquidMetalButton } from "@/components/LiquidMetalButton";
import { RollingText } from "@/components/RollingText";

export default function Banner() {
    const glowRef = useRef<HTMLDivElement>(null);
    const navItems = ["Home", "About", "Work / Portfolio", "Blog", "Contact"];
    const [activeNav, setActiveNav] = useState("Home");
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);
    const [activeLine, setActiveLine] = useState(0);
    const [hidden, setHidden] = useState(false);
    const [isCompact, setIsCompact] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

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

    const effectiveIsCompact = isCompact || isMobile;

    return (
        <section className={styles.banner}>
            <motion.nav
                className={`${styles.nav} ${effectiveIsCompact ? styles.navCompact : ""}`}
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: -100, opacity: 0 }
                }}
                animate={hidden ? "hidden" : "visible"}
                initial={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <div className={styles.navLogo}>
                    <div className={styles.logoImageWrapper}>
                        <Image
                            src="/Whisk_74972c1328c633aa89d4f1ae1bf892a9eg.png"
                            alt="Logo"
                            width={40}
                            height={40}
                            priority
                            style={{
                                objectFit: 'cover',
                                width: '100%',
                                height: '100%'
                            }}
                        />
                    </div>
                    <span>Muhammad Awais</span>
                </div>

                <AnimatePresence mode="wait">
                    {!effectiveIsCompact ? (
                        <motion.div
                            key="full-menu"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            className={styles.navMenus}
                            onMouseLeave={() => setHoveredNav(null)}
                        >
                            {navItems.map((item) => {
                                const isCurrent = (hoveredNav || activeNav) === item;
                                return (
                                    <div
                                        key={item}
                                        className={styles.navItem}
                                        onMouseEnter={() => setHoveredNav(item)}
                                        onClick={() => setActiveNav(item)}
                                        style={{
                                            position: "relative",
                                            zIndex: 1,
                                            color: isCurrent ? "black" : "rgba(255, 255, 255, 0.6)"
                                        }}
                                    >
                                        <span style={{ position: "relative", zIndex: 2 }}>{item}</span>
                                        {isCurrent && (
                                            <motion.div
                                                layoutId="navPill"
                                                layout
                                                initial={{ borderRadius: 40 }}
                                                style={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    backgroundColor: "white",
                                                    borderRadius: 40,
                                                    zIndex: -1
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 30,
                                                    mass: 0.8
                                                }}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="hamburger"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90, transition: { duration: 0.2 } }}
                            className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ""}`}
                            style={{ display: "flex" }} // Override CSS display:none
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <span />
                            <span />
                            <span />
                        </motion.div>
                    )}
                </AnimatePresence>

                <LiquidMetalButton label="See Projects" />

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className={styles.dropdownMenu}
                            initial={{ opacity: 0, y: -20, x: "-50%", scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                            exit={{ opacity: 0, y: -20, x: "-50%", scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <div className={styles.dropdownLeft} onMouseLeave={() => setHoveredNav(null)}>
                                {navItems.map((item) => {
                                    const isCurrent = (hoveredNav || activeNav) === item;
                                    return (
                                        <div
                                            key={item}
                                            className={styles.dropdownItem}
                                            onMouseEnter={() => setHoveredNav(item)}
                                            onClick={() => {
                                                setActiveNav(item);
                                                setIsMenuOpen(false);
                                            }}
                                            style={{
                                                position: "relative",
                                                zIndex: 1,
                                                color: isCurrent ? "white" : "#333"
                                            }}
                                        >
                                            <span style={{ position: "relative", zIndex: 2 }}>{item}</span>
                                            {isCurrent && (
                                                <motion.div
                                                    layoutId="dropdownPill"
                                                    layout
                                                    initial={{ borderRadius: 12 }}
                                                    style={{
                                                        position: "absolute",
                                                        inset: 0,
                                                        backgroundColor: "black",
                                                        borderRadius: 12,
                                                        zIndex: -1
                                                    }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 400,
                                                        damping: 30,
                                                        mass: 0.8
                                                    }}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={styles.dropdownRight}>
                                <div className={styles.dropdownCard}>
                                    <Image
                                        src="/PRICING.png"
                                        alt="Muhammad Awais"
                                        fill
                                        style={{ objectFit: 'cover', objectPosition: 'top center', borderRadius: '16px' }}
                                    />
                                    <div className={styles.dropdownCardOverlay}>
                                        <LiquidMetalButton label="Contact Me" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            <div className={styles.mainContent}>
                {/* Glow Background */}
                <div className={styles.glowContainer}>
                    <div ref={glowRef} className={styles.glowCircle} style={{ width: '30vw', height: '30vw' }} />
                    <div className={styles.glowCircle} style={{ width: '20vw', height: '20vw', opacity: 0.2 }} />
                </div>

                {/* Decorative Background Lines */}
                <div className={styles.decorativeLines}>
                    {[1, 2, 3, 4].map((i, index) => (
                        <div
                            key={i}
                            className={`${styles.line} ${activeLine === index ? styles.lineShining : ""}`}
                            style={{
                                width: `${i * 14}vw`,
                                height: `${i * 14}vw`,
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
                    <button className={styles.talkBtn}>
                        <span className={styles.btnText}>LET&apos;S TALK</span>
                        <div className={styles.btnIconCircle}>
                            <div className={styles.arrowTrack}>
                                <div className={styles.arrowIconPrimary}>
                                    <ArrowRight size={16} strokeWidth={2.2} />
                                </div>
                                <div className={styles.arrowIconSecondary}>
                                    <ArrowRight size={16} strokeWidth={2.2} />
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </section >
    );
}
