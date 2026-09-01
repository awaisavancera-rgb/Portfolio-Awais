"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Twitter, Instagram, Youtube, ArrowRight } from "lucide-react";
import styles from "./banner.module.css";

export default function Banner() {
    const glowRef = useRef<HTMLDivElement>(null);
    const [activeLine, setActiveLine] = useState(0);

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
