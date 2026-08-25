"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import styles from "./header.module.css";
import { LiquidMetalButton } from "@/components/LiquidMetalButton";

export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const navItems = ["Home", "About", "Work / Portfolio", "Blog", "Contact"];
    const [activeNav, setActiveNav] = useState(pathname === "/portfolio" ? "Work / Portfolio" : "Home");
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);
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

    const handleNavClick = (item: string) => {
        setActiveNav(item);
        setIsMenuOpen(false);
        if (item === "Work / Portfolio") {
            router.push("/portfolio");
        } else if (item === "Home") {
            router.push("/");
        } else if (pathname === "/portfolio") {
            router.push("/");
        }
    };

    const effectiveIsCompact = isCompact || isMobile;

    return (
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
                                    onClick={() => handleNavClick(item)}
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
                                        onClick={() => handleNavClick(item)}
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
    );
}
