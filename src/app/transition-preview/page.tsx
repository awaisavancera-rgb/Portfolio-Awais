"use client";

import React from "react";
import styles from "./transitionPreview.module.css";

export default function TransitionPreviewPage() {
    return (
        <div className={styles.screen}>
            {/* ─── MAIN CONTENT ─── */}
            <div className={styles.mainContent}>
                {/* LEFT SIDE: Huge Typography */}
                <div className={styles.leftSide}>
                    <h1 className={styles.hugeText}>
                        <span className={styles.hugeLine}>Muhammad</span>
                        <span className={styles.hugeLine} style={{ textAlign: "right" }}>
                            Awais
                            <sup className={styles.registeredMark}>®</sup>
                        </span>
                    </h1>
                </div>

                {/* RIGHT SIDE: Image */}
                <div className={styles.rightSide}>
                    <div className={styles.imageWrapper}>
                        <img
                            src="/PRICING.png"
                            alt="Muhammad Awais"
                            className={styles.portraitImage}
                        />
                    </div>
                </div>
            </div>

            {/* ─── FULL WIDTH SKILLS STRIP ─── */}
            <div className={styles.skillsStrip}>
                <span>Freelancer</span>
                <span>Digital Nomad</span>
                <span>Creative Developer</span>
            </div>

            {/* ─── BOTTOM SECTION ─── */}
            <div className={styles.bottomSection}>
                <div className={styles.percentageArea}>
                    <div className={styles.percentageNumber}>
                        100<span className={styles.percentSign}>%</span>
                    </div>
                    {/* Progress line */}
                    <div className={styles.progressTrack}>
                        <div className={styles.progressFill} style={{ width: "100%" }} />
                    </div>
                    <div className={styles.statusRow}>
                        <span className={styles.statusLabel}>LOADING WEBSITE...</span>
                        <span className={styles.statusLabel}>COMPLETE</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
