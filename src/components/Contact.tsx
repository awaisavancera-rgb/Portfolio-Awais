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
        <section id="contact" className={styles.contactSection}>
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
                    <span className={styles.availableTag}>
                        AVAILABLE FOR NEW PROJECTS
                    </span>

                    <h2 className={styles.title}>
                        I’d Love to Hear <span className={styles.titleLight}>From You.</span>
                    </h2>

                    <p className={styles.description}>
                        Have questions, an upcoming project, or looking to collaborate? I&apos;m always open to discussing new ideas, opportunities, and partnerships. Let&apos;s create something extraordinary together.
                    </p>

                    <div className={styles.actionButtons}>
                        <Link href="/contact" className="primary-btn">
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
                        </Link>

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

                {/* Right Column: Cardless Editorial Direct Inquiries & Status */}
                <div className={styles.rightColumn}>
                    <div className={styles.columnHeader}>
                        <span className={styles.columnTag}>DIRECT INQUIRIES</span>
                        <span className={styles.columnIndex}>(04 CHANNELS)</span>
                    </div>

                    <div className={styles.lists}>
                        <a className={styles.listItem} href="mailto:hello@awaisportfolio.com">
                            <div className={styles.listItemContent}>
                                <div className={styles.textRollWrapper}>
                                    <span className={styles.listItemText}>hello@awaisportfolio.com</span>
                                    <span className={styles.listItemTextHover}>hello@awaisportfolio.com</span>
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

                        <a target="_blank" rel="noopener noreferrer" className={styles.listItem} href="https://maps.google.com/?q=Karachi+Pakistan">
                            <div className={styles.listItemContent}>
                                <div className={styles.textRollWrapper}>
                                    <span className={styles.listItemText}>Office: Karachi, Pakistan.</span>
                                    <span className={styles.listItemTextHover}>Office: Karachi, Pakistan.</span>
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
                    </div>

                    {/* Minimalist Bottom Status & Social Strip */}
                    <div className={styles.bottomMetaStrip}>
                        <div className={styles.statusBlock}>
                            <span className={styles.liveIndicatorDot} />
                            <span className={styles.statusText}>Available for Remote Worldwide &bull; PKT (UTC+5)</span>
                        </div>

                        <div className={styles.socialsInline}>
                            <Link href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.socialLinkInline}>
                                <span>LinkedIn</span>
                                <ArrowUpRight size={13} />
                            </Link>
                            <Link href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.socialLinkInline}>
                                <span>Twitter/X</span>
                                <ArrowUpRight size={13} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
