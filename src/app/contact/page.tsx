"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ContactDark } from "./ContactDark";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import styles from "./contact.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ContactPage() {
    const triggerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!triggerRef.current || !imageRef.current) return;

        gsap.fromTo(imageRef.current,
            { yPercent: -20 },
            {
                yPercent: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                }
            }
        );
    });

    return (
        <main id="main-content" className={styles.contactSection}>
            <div className={styles.container}>
                <div className={styles.top}>
                    {/* The White Strip */}
                    <div className={styles.whiteStripContainer}>
                        <div className={styles.whiteStrip}>
                            <p>Fly</p>
                            <p>Call Me</p>
                            <p>24/7 Support</p>
                            <p>Remote</p>
                        </div>
                    </div>

                    <div className={styles.leftColumn} ref={triggerRef}>
                        <div className={styles.imageWrapper} ref={imageRef}>
                            <Image
                                src="/Cinematic Stairwell Light and Shadows.png"
                                alt="Woman Staircase"
                                fill
                                priority
                                style={{ objectFit: "cover", objectPosition: "center" }}
                                unoptimized
                            />
                        </div>
                    </div>

                    <div className={styles.rightColumn}>
                        <div className={styles.lists}>
                            <Link href="mailto:awaisarain953@gmail.com" target="_blank" className={styles.listItem}>
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
                            </Link>

                            <Link href="https://www.instagram.com/" target="_blank" className={styles.listItem}>
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
                            </Link>

                            <Link href="tel:+923103751421" className={styles.listItem}>
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
                            </Link>

                            <Link href="mailto:awaisarai953@gmail.com" className={styles.listItem}>
                                <div className={styles.listItemContent}>
                                    <div className={styles.textRollWrapper}>
                                        <span className={styles.listItemText}>awaisarai953@gmail.com</span>
                                        <span className={styles.listItemTextHover}>awaisarai953@gmail.com</span>
                                    </div>
                                    <ArrowUpRight className={styles.icon} />
                                </div>
                                <div className={styles.line}>
                                    <div className={styles.lineFiller}></div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.bottomLine}></div>
                    <h1 className={styles.hugeText}>Contact Now</h1>
                </div>
            </div>

            <ContactDark />
            <FaqSection />
            <Footer />
        </main>
    );
}
