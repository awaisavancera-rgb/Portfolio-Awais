"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./footer.module.css";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Footer() {
    const containerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!contentRef.current || !containerRef.current) return;

        // Premium Parallax Reveal (Curtain effect)
        // The footer content starts translated downwards by 30% of its height,
        // and physically translates into place (0%) as you scroll down the container
        gsap.fromTo(contentRef.current,
            { yPercent: 30 },
            {
                yPercent: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: 1,
                }
            }
        );
    }, { scope: containerRef });

    return (
        <footer className={styles.footerWrapper} ref={containerRef}>
            <div className={styles.footerContent} ref={contentRef}>

                {/* Top: Mega Title */}
                <div className={styles.titleWrapper}>
                    <h1 className={styles.megaTitle}>
                        Muhammad Awais
                    </h1>
                </div>

                {/* Middle: Info and Newsletter */}
                <div className={styles.middleWrapper}>
                    <div className={styles.contactInfo}>
                        <p className={styles.description}>
                            Whether you&apos;re building a brand, designing a product, or
                            simply want to explore an idea, <span className={styles.descriptionHighlight}>we&apos;d love to hear from you.</span>
                        </p>
                        <div className={styles.directContact}>
                            <a href="mailto:hello@awaisportfolio.com" className={styles.emailLink}>hello@awaisportfolio.com</a>
                            <span className={styles.phoneText}>+92 310 3751421</span>
                        </div>
                    </div>

                    <div className={styles.newsletterWrapper}>
                        <span className={styles.newsletterTitle}>Sign up for our monthly newsletter.</span>
                        <input type="email" placeholder="Email" className={styles.newsletterInput} />
                        <button className={styles.newsletterButton}>Sign up</button>
                    </div>
                </div>

                {/* Bottom: Nav Columns */}
                <div className={styles.bottomWrapper}>
                    <div className={styles.linksColumn}>
                        <Link href="/" className={styles.footerLink}>Home</Link>
                        <Link href="/about" className={styles.footerLink}>About</Link>
                        <Link href="/projects" className={styles.footerLink}>Projects</Link>
                        <Link href="/blog" className={styles.footerLink}>Blog</Link>
                        <Link href="/contact" className={styles.footerLink}>Contact</Link>
                    </div>

                    <div className={styles.linksColumn}>
                        <Link href="/terms" className={styles.footerLink}>Terms & Conditions</Link>
                        <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
                        <Link href="/404" className={styles.footerLink}>404</Link>
                    </div>

                    <div className={styles.linksColumn}>
                        <Link href="https://twitter.com" className={styles.footerLink}>Twitter/X</Link>
                        <Link href="https://instagram.com" className={styles.footerLink}>Instagram</Link>
                        <Link href="https://linkedin.com" className={styles.footerLink}>LinkedIn</Link>
                    </div>

                    <div className={styles.linksColumn} style={{ alignItems: "flex-end" }}>
                        <span className={styles.legalText}>Designed by <span className={styles.legalWhite}>Awais</span></span>
                        <span className={styles.legalText}>© 2026 All rights reserved</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}
