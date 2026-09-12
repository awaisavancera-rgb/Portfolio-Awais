"use client";

import styles from "./contact.module.css";
import { ArrowRight, ArrowUpRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function Contact() {
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("hello@awaisportfolio.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
    };

    return (
        <section className={styles.contactSection}>
            {/* Header Info */}
            <div className={styles.headerInfo}>
                <div className={styles.headerCol}>
                    <span>© CONTACT 連絡先</span>
                </div>
                <div className={styles.headerCol} style={{ textAlign: "center" }}>
                    <span>(WDX® — 07)</span>
                </div>
                <div className={styles.headerCol} style={{ textAlign: "right" }}>
                    <span>LET&apos;S TALK</span>
                </div>
            </div>

            <div className={styles.contentWrapper}>
                {/* Left Column: CTA Hero */}
                <div className={styles.leftColumn}>
                    <div className={styles.pill}>
                        <div className={styles.pillDot} />
                        AVAILABLE FOR NEW PROJECTS
                    </div>

                    <h2 className={styles.title}>
                        I’d Love to Hear <span className={styles.titleLight}>From You.</span>
                    </h2>

                    <p className={styles.description}>
                        Have questions, an upcoming project, or looking to collaborate? I&apos;m always open to discussing new ideas, opportunities, and partnerships. Let&apos;s create something extraordinary together.
                    </p>

                    <div className={styles.actionButtons}>
                        <a href="mailto:hello@awaisportfolio.com" className="primary-btn">
                            <span className="btnText">GET IN TOUCH</span>
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

                        <button 
                            type="button"
                            className={styles.copyBtn} 
                            onClick={handleCopyEmail}
                            aria-label="Copy email address"
                        >
                            {copied ? (
                                <>
                                    <Check size={16} className={styles.copyCheckIcon} />
                                    <span>EMAIL COPIED!</span>
                                </>
                            ) : (
                                <>
                                    <Copy size={15} />
                                    <span>COPY EMAIL</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Right Column: Interactive Dark Contact Cards */}
                <div className={styles.rightColumn}>
                    {/* Direct Inquiries Card */}
                    <div className={styles.contactCard}>
                        <div className={styles.cardHeader}>
                            <span className={styles.cardSectionTag}>DIRECT INQUIRIES</span>
                        </div>

                        <div className={styles.cardList}>
                            <a href="mailto:hello@awaisportfolio.com" className={styles.contactLinkRow}>
                                <div className={styles.linkInfo}>
                                    <span className={styles.linkLabel}>EMAIL</span>
                                    <span className={styles.linkValue}>hello@awaisportfolio.com</span>
                                </div>
                                <ArrowUpRight className={styles.rowArrow} size={18} />
                            </a>

                            <a href="tel:+923103751421" className={styles.contactLinkRow}>
                                <div className={styles.linkInfo}>
                                    <span className={styles.linkLabel}>PHONE / WHATSAPP</span>
                                    <span className={styles.linkValue}>+92 310 3751421</span>
                                </div>
                                <ArrowUpRight className={styles.rowArrow} size={18} />
                            </a>

                            <div className={styles.contactLinkRowStatic}>
                                <div className={styles.linkInfo}>
                                    <span className={styles.linkLabel}>LOCATION</span>
                                    <span className={styles.linkValue}>Karachi Gulshan-e-Iqbal, Pakistan</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sub Info & Socials */}
                    <div className={styles.subCardsGrid}>
                        <div className={styles.subCard}>
                            <div className={styles.subCardHeader}>
                                <span className={styles.liveIndicatorDot} />
                                <span className={styles.subCardTag}>AVAILABILITY</span>
                            </div>
                            <span className={styles.subCardValue}>Open for Remote Worldwide</span>
                            <span className={styles.subCardSub}>PKT (UTC+5) • Mon – Fri</span>
                        </div>

                        <div className={styles.subCard}>
                            <div className={styles.subCardHeader}>
                                <span className={styles.subCardTag}>CONNECT</span>
                            </div>
                            <div className={styles.socialsList}>
                                <Link href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.socialItem}>
                                    <span>LinkedIn</span>
                                    <ArrowUpRight size={13} />
                                </Link>
                                <Link href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.socialItem}>
                                    <span>Twitter / X</span>
                                    <ArrowUpRight size={13} />
                                </Link>
                                <Link href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.socialItem}>
                                    <span>Instagram</span>
                                    <ArrowUpRight size={13} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
