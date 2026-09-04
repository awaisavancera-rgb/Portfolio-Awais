"use client";

import styles from "./contactDark.module.css";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export function ContactDark() {
    const [selectedPlan, setSelectedPlan] = useState<string>("Freelance Work");

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
                    <span>LET'S TALK</span>
                </div>
            </div>

            <div className={styles.contentWrapper}>
                {/* Left Column */}
                <div className={styles.leftColumn}>
                    <div className={styles.pill}>
                        <div className={styles.pillDot} />
                        CONTACT & SUPPORT
                    </div>

                    <h2 className={styles.title}>
                        I’d Love to Hear <span className={styles.titleLight}>From You.</span>
                    </h2>

                    <p className={styles.description}>
                        Have questions or need support? I'm always here to help you every step of the way.
                    </p>

                    <div className={styles.darkCard}>
                        <div className={styles.contactItem}>
                            <span className={styles.contactLabel}>EMAIL:</span>
                            <span className={styles.contactValue}>hello@awaisportfolio.com</span>
                        </div>
                        <div className={styles.contactItem}>
                            <span className={styles.contactLabel}>PHONE:</span>
                            <span className={styles.contactValue}>+92 310 3751421</span>
                        </div>
                        <div className={styles.contactItem}>
                            <span className={styles.contactLabel}>ADDRESS:</span>
                            <span className={styles.contactValue}>Karachi Gulshan-e-Iqbal, Pakistan</span>
                        </div>
                    </div>
                </div>

                {/* Right Column - Form */}
                <div className={styles.rightColumn}>
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>FULL NAME</label>
                        <input type="text" className={styles.inputField} placeholder="Jane Smith" />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>YOUR EMAIL</label>
                        <input type="email" className={styles.inputField} placeholder="jane@domain.com" />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>INQUIRY TYPE</label>
                        <div className={styles.planSelection}>
                            <div
                                className={`${styles.planButton} ${selectedPlan === "Freelance Work" ? styles.planDark : styles.planLight}`}
                                onClick={() => setSelectedPlan("Freelance Work")}
                            >
                                Freelance Work
                            </div>
                            <div
                                className={`${styles.planButton} ${selectedPlan === "Full-time Job" ? styles.planDark : styles.planLight}`}
                                onClick={() => setSelectedPlan("Full-time Job")}
                            >
                                Full-time Job
                            </div>
                            <div
                                className={`${styles.planButton} ${selectedPlan === "Just saying Hi" ? styles.planDark : styles.planLight}`}
                                onClick={() => setSelectedPlan("Just saying Hi")}
                            >
                                Just saying Hi
                            </div>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>MESSAGE</label>
                        <textarea className={styles.textareaField} placeholder="Type Your Message..."></textarea>
                    </div>

                    {/* Using the standard site theme button aligned completely */}
                    <div className={styles.submitWrapper}>
                        <button className={styles.contactBtn}>
                            <span className={styles.btnText}>GET IN TOUCH</span>
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

            </div>
        </section>
    );
}
