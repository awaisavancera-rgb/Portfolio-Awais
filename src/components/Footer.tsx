"use client";

import styles from "./footer.module.css";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Footer() {
    // Force recompile to clear Turbopack HMR error
    return (
        <footer className={styles.footerWrapper}>
            <div className={styles.footerContent}>
                {/* Top Section from Reference */}
                <div className={styles.referenceTopSection}>
                    {/* Top Bar */}
                    <div className={styles.topBar}>
                        <span>Independent</span>
                        <span>Overview</span>
                        <span>Multidisciplinary</span>
                        <span>Focused</span>
                    </div>

                    <div className={styles.referenceContent}>
                        <p className={styles.referenceText}>
                            I build expressive, performance-driven websites by blending clean design and native development inside Framer to help creative teams and modern brands stand out with intention.
                        </p>
                        <a href="mailto:hello@awaisportfolio.com" className="primary-btn">
                            <span className="btnText">EMAIL ME</span>
                            <div className="btnIconCircle">
                                <div className="arrowTrack">
                                    <div className="arrowIconPrimary">
                                        <ArrowRight size={16} strokeWidth={2.2} />
                                    </div>
                                    <div className="arrowIconSecondary">
                                        <ArrowRight size={16} strokeWidth={2.2} />
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

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
                        <span className={styles.newsletterTitle}>Get updates and insights - Sign up for monthly newsletter.</span>
                        <input type="email" placeholder="Email" className={styles.newsletterInput} />
                        <button className={styles.viewMoreBtn}>
                            <span className={styles.btnText}>SIGN UP</span>
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
