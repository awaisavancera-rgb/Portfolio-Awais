"use client";

import styles from "./portfolioBanner.module.css";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function PortfolioBanner() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax effect for the image wrapper
    const yTransform = useTransform(scrollYProgress, [0, 1], ["-20%", "5%"]);

    return (
        <section ref={containerRef} className={styles.container}>
            <div className={styles.top}>
                <div className={styles.whiteStripContainer}>
                    <div className={styles.whiteStrip}>
                        <p>Fly</p>
                        <p>Call Me</p>
                        <p>24/7 Support</p>
                        <p>Remote</p>
                    </div>
                </div>
                <div className={styles.leftColumn}>
                    <motion.div
                        className={styles.imageWrapper}
                        style={{ y: yTransform }}
                    >
                        <img
                            alt="Woman Staircase"
                            decoding="async"
                            data-nimg="fill"
                            src="Cinematic Stairwell Light and Shadows.png"
                            style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', objectFit: 'cover', objectPosition: 'center center', color: 'transparent' }}
                        />
                    </motion.div>
                </div>
                <div className={styles.rightColumn}>
                    <div className={styles.lists}>
                        <a target="_blank" rel="noopener noreferrer" className={styles.listItem} href="mailto:awaisarain953@gmail.com">
                            <div className={styles.listItemContent}>
                                <div className={styles.textRollWrapper}>
                                    <span className={styles.listItemText}>Location: Karachi, Pakistan.</span>
                                    <span className={styles.listItemTextHover}>Location: Karachi, Pakistan.</span>
                                </div>
                                <ArrowUpRight className={styles.icon} />
                            </div>
                            <div className={styles.line}>
                                <div className={styles.lineFiller}></div>
                            </div>
                        </a>
                        <a target="_blank" rel="noopener noreferrer" className={styles.listItem} href="https://www.instagram.com/">
                            <div className={styles.listItemContent}>
                                <div className={styles.textRollWrapper}>
                                    <span className={styles.listItemText}>Follow me on Instagram</span>
                                    <span className={styles.listItemTextHover}>Follow me on Instagram</span>
                                </div>
                                <ArrowUpRight className={styles.icon} />
                            </div>
                            <div className={styles.line}>
                                <div className={styles.lineFiller}></div>
                            </div>
                        </a>
                        <a className={styles.listItem} href="tel:+923103751421">
                            <div className={styles.listItemContent}>
                                <div className={styles.textRollWrapper}>
                                    <span className={styles.listItemText}>+92 310 3751421</span>
                                    <span className={styles.listItemTextHover}>+92 310 3751421</span>
                                </div>
                                <ArrowUpRight className={styles.icon} />
                            </div>
                            <div className={styles.line}>
                                <div className={styles.lineFiller}></div>
                            </div>
                        </a>
                        <a className={styles.listItem} href="mailto:awaisarain953@gmail.com">
                            <div className={styles.listItemContent}>
                                <div className={styles.textRollWrapper}>
                                    <span className={styles.listItemText}>awaisarain953@gmail.com</span>
                                    <span className={styles.listItemTextHover}>awaisarain953@gmail.com</span>
                                </div>
                                <ArrowUpRight className={styles.icon} />
                            </div>
                            <div className={styles.line}>
                                <div className={styles.lineFiller}></div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
