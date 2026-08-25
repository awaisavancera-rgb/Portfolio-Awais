"use client";

import { useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './galleryBanner.module.css';

export function GalleryBanner() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Apply a smooth spring so the images float gracefully (lower stiffness for smoother, floatier feel)
    const smoothX = useSpring(mouseX, { damping: 40, stiffness: 80, mass: 0.5 });
    const smoothY = useSpring(mouseY, { damping: 40, stiffness: 80, mass: 0.5 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate mouse position relative to the center of the container (-1 to 1)
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        // Slowly return images to original positions when mouse leaves
        mouseX.set(0);
        mouseY.set(0);
    };

    // Define parallax offsets (reduced ranges for a more subtle, less extreme movement)
    const x1 = useTransform(smoothX, [-1, 1], [15, -15]);
    const y1 = useTransform(smoothY, [-1, 1], [15, -15]);

    const x2 = useTransform(smoothX, [-1, 1], [25, -25]);
    const y2 = useTransform(smoothY, [-1, 1], [25, -25]);

    const x3 = useTransform(smoothX, [-1, 1], [-10, 10]);
    const y3 = useTransform(smoothY, [-1, 1], [-10, 10]);

    const x4 = useTransform(smoothX, [-1, 1], [-20, 20]);
    const y4 = useTransform(smoothY, [-1, 1], [-20, 20]);

    const x5 = useTransform(smoothX, [-1, 1], [30, -30]);
    const y5 = useTransform(smoothY, [-1, 1], [30, -30]);

    return (
        <section
            ref={containerRef}
            className={styles.galleryBanner}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles.content}>
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    Works©
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Link href="/contact" className={styles.talkBtn}>
                        <span className={styles.btnText}>CONTACT NOW</span>
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
                    </Link>
                </motion.div>
            </div>

            <div className={styles.imagesContainer}>
                {/* Image 1 */}
                <motion.div className={`${styles.imageWrapper} ${styles.img1}`} style={{ x: x1, y: y1 }}>
                    <Image
                        src="https://framerusercontent.com/images/n6qKLSNOWse4XjIvQ1XrrD66oE.png"
                        alt="Woman On The Grass"
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized
                    />
                </motion.div>

                {/* Image 2 */}
                <motion.div className={`${styles.imageWrapper} ${styles.img2}`} style={{ x: x2, y: y2 }}>
                    <Image
                        src="https://framerusercontent.com/images/iiGTolB7dNCehqd8pKKhmB9uo.png"
                        alt="Woman"
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized
                    />
                </motion.div>

                {/* Image 3 */}
                <motion.div className={`${styles.imageWrapper} ${styles.img3}`} style={{ x: x3, y: y3 }}>
                    <Image
                        src="https://framerusercontent.com/images/dfa6kXeZNdp07AUexK86lC0Av1Q.png"
                        alt="Afro"
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized
                    />
                </motion.div>

                {/* Image 4 */}
                <motion.div className={`${styles.imageWrapper} ${styles.img4}`} style={{ x: x4, y: y4 }}>
                    <Image
                        src="https://framerusercontent.com/images/KLvrs0tg1z4LY8ajUcoLnr8I8U.png"
                        alt="Man Reading"
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized
                    />
                </motion.div>

                {/* Image 5 */}
                <motion.div className={`${styles.imageWrapper} ${styles.img5}`} style={{ x: x5, y: y5 }}>
                    <Image
                        src="https://framerusercontent.com/images/ykB2unblGBc4DohSe1vhH0DUD4.png"
                        alt="Woman In The Red BG"
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized
                    />
                </motion.div>

                {/* Image 6 */}
                <motion.div className={`${styles.imageWrapper} ${styles.img6}`} style={{ x: x1, y: y1 }}>
                    <Image
                        src="https://framerusercontent.com/images/YxK2kyMSXDwqtlKpiPq0jLJ9o.png"
                        alt="Black Man"
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized
                    />
                </motion.div>

                {/* Video 7 */}
                <motion.div className={`${styles.imageWrapper} ${styles.img7}`} style={{ x: x3, y: y3 }}>
                    <video
                        src="https://framerusercontent.com/assets/rOQYaZXQCrRwFCBvFvQvQ2Zvm0.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </motion.div>

                {/* Image 8 */}
                <motion.div className={`${styles.imageWrapper} ${styles.img8}`} style={{ x: x2, y: y2 }}>
                    <Image
                        src="https://framerusercontent.com/images/OSi9o75iDVuZiGamIk9aSmb6HHI.png"
                        alt="Woman Garden Pose"
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized
                    />
                </motion.div>
            </div>
        </section>
    );
}
