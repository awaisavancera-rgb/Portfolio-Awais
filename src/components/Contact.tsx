"use client";

import styles from "./contact.module.css";
import { motion } from "framer-motion";
import { RollingText } from "./RollingText";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

export function Contact() {
    const [selectedPlan, setSelectedPlan] = useState<"Pro" | "Enterprise">("Enterprise");

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

            {/* Table Header Ribbon */}
            <div className={styles.tableHeader}>
                <span className={styles.headerNum}>Index</span>
                <span className={styles.headerMain}>Service</span>
                <span className={styles.headerToggle}>Explore</span>
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
                    Have questions or need support? Our team is here to help you every step of the way.
                </p>

                <div className={styles.darkCard}>
                    <div className={styles.contactItem}>
                        <span className={styles.contactLabel}>EMAIL:</span>
                        <span className={styles.contactValue}>sales@aithor.com</span>
                    </div>
                    <div className={styles.contactItem}>
                        <span className={styles.contactLabel}>PHONE:</span>
                        <span className={styles.contactValue}>+359-88777980</span>
                    </div>
                    <div className={styles.contactItem}>
                        <span className={styles.contactLabel}>ADDRESS:</span>
                        <span className={styles.contactValue}>Georgi S. Rakovski Street, Sofia, Bulgaria</span>
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
                    <input type="email" className={styles.inputField} placeholder="jane@framer.com" />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.inputLabel}>SELECT PLAN</label>
                    <div className={styles.planSelection}>
                        <div
                            className={`${styles.planButton} ${selectedPlan === "Pro" ? styles.planDark : styles.planLight}`}
                            onClick={() => setSelectedPlan("Pro")}
                        >
                            Pro
                        </div>
                        <div
                            className={`${styles.planButton} ${selectedPlan === "Enterprise" ? styles.planDark : styles.planLight}`}
                            onClick={() => setSelectedPlan("Enterprise")}
                        >
                            Enterprise
                        </div>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.inputLabel}>MESSAGE</label>
                    <textarea className={styles.textareaField} placeholder="Type Your Message..."></textarea>
                </div>

                {/* Using the standard site theme button aligned completely */}
                <div className={styles.submitWrapper}>
                    <motion.button
                        className="btn-talk"
                        whileHover={{ scale: 1.02 }} // Slightly softer scale for a massive width button
                        whileTap={{ scale: 0.98 }}
                        style={{ width: "100%", justifyContent: "center" }}
                    >
                        <RollingText text="Get In Touch" />
                        <span className="icon-circle">
                            <ArrowUpRight size={16} />
                        </span>
                    </motion.button>
                </div>

                </div>

            </div>
        </section>
    );
}
