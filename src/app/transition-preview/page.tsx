"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./transitionPreview.module.css";

export default function TransitionPreviewPage() {
    const line1Ref = useRef<HTMLSpanElement>(null);
    const line2Ref = useRef<HTMLSpanElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const skillsStripRef = useRef<HTMLDivElement>(null);
    const percentNumberRef = useRef<HTMLSpanElement>(null);
    const progressFillRef = useRef<HTMLDivElement>(null);
    const statusLabelRef = useRef<HTMLSpanElement>(null);

    const [counterVal, setCounterVal] = useState(0);

    const playAnimation = () => {
        // Kill existing tweens
        gsap.killTweensOf([
            line1Ref.current,
            line2Ref.current,
            imageRef.current,
            skillsStripRef.current,
            progressFillRef.current,
        ]);

        const counterObj = { val: 0 };
        setCounterVal(0);

        // Initial setup
        gsap.set([line1Ref.current, line2Ref.current], {
            yPercent: 120,
            opacity: 0,
        });
        gsap.set(imageRef.current, {
            scale: 1.15,
            opacity: 0,
        });
        gsap.set(skillsStripRef.current, {
            y: 20,
            opacity: 0,
        });
        gsap.set(progressFillRef.current, {
            width: "0%",
        });
        if (statusLabelRef.current) {
            statusLabelRef.current.textContent = "INITIALIZING...";
        }

        const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
        });

        // 1. Text reveals with editorial stagger
        tl.to(line1Ref.current, {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power4.out",
        }, 0.1)
        .to(line2Ref.current, {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power4.out",
        }, 0.22)

        // 2. Image scale/fade reveal
        .to(imageRef.current, {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
        }, 0.25)

        // 3. Skills strip reveal
        .to(skillsStripRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
        }, 0.35)

        // 4. Percentage counter & progress fill (0 -> 100%)
        .to(counterObj, {
            val: 100,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate: () => {
                const rounded = Math.round(counterObj.val);
                setCounterVal(rounded);
                if (progressFillRef.current) {
                    progressFillRef.current.style.width = `${rounded}%`;
                }
                if (statusLabelRef.current) {
                    if (rounded < 40) {
                        statusLabelRef.current.textContent = "LOADING ASSETS...";
                    } else if (rounded < 85) {
                        statusLabelRef.current.textContent = "COMPOSITING SCENE...";
                    } else if (rounded < 100) {
                        statusLabelRef.current.textContent = "FINALIZING...";
                    } else {
                        statusLabelRef.current.textContent = "SYSTEM READY • COMPLETE";
                    }
                }
            },
        }, 0.2);
    };

    useEffect(() => {
        playAnimation();
    }, []);

    return (
        <div className={styles.screen}>
            {/* Replay button for testing */}
            <button
                type="button"
                onClick={playAnimation}
                className={styles.replayButton}
                title="Replay animation"
            >
                ↺ Replay Animation
            </button>

            {/* ─── MAIN CONTENT ─── */}
            <div className={styles.mainContent}>
                {/* LEFT SIDE: Huge Typography */}
                <div className={styles.leftSide}>
                    <h1 className={styles.hugeText}>
                        <span className={styles.lineMask}>
                            <span ref={line1Ref} className={styles.hugeLine}>
                                Muhammad
                            </span>
                        </span>
                        <span className={styles.lineMask}>
                            <span
                                ref={line2Ref}
                                className={styles.hugeLine}
                                style={{ textAlign: "right" }}
                            >
                                Awais
                                <sup className={styles.registeredMark}>®</sup>
                            </span>
                        </span>
                    </h1>
                </div>

                {/* RIGHT SIDE: Image */}
                <div className={styles.rightSide}>
                    <div ref={imageRef} className={styles.imageWrapper}>
                        <img
                            src="/PRICING.png"
                            alt="Muhammad Awais"
                            className={styles.portraitImage}
                        />
                    </div>
                </div>
            </div>

            {/* ─── FULL WIDTH SKILLS STRIP ─── */}
            <div ref={skillsStripRef} className={styles.skillsStrip}>
                <span>Freelancer</span>
                <span>Digital Nomad</span>
                <span>Creative Developer</span>
            </div>

            {/* ─── BOTTOM SECTION ─── */}
            <div className={styles.bottomSection}>
                <div className={styles.percentageArea}>
                    <div className={styles.percentageNumber}>
                        <span ref={percentNumberRef}>{counterVal}</span>
                        <span className={styles.percentSign}>%</span>
                    </div>

                    {/* Progress line */}
                    <div className={styles.progressTrack}>
                        <div
                            ref={progressFillRef}
                            className={styles.progressFill}
                            style={{ width: `${counterVal}%` }}
                        />
                    </div>

                    <div className={styles.statusRow}>
                        <span ref={statusLabelRef} className={styles.statusLabel}>
                            LOADING ASSETS...
                        </span>
                        <span className={styles.statusLabel}>
                            {counterVal === 100 ? "COMPLETE" : "PLEASE WAIT"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
