"use client";

import React, { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./pageTransition.module.css";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Programmatically trigger the bottom-up page transition.
 */
export function triggerPageTransition(href: string) {
    if (typeof window !== "undefined") {
        window.dispatchEvent(
            new CustomEvent("trigger-page-transition", { detail: { href } })
        );
    }
}

export function PageTransition() {
    const pathname = usePathname();
    const router = useRouter();

    const overlayRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const frameAccentRef = useRef<HTMLDivElement>(null);
    const frameMainRef = useRef<HTMLDivElement>(null);

    const line1Ref = useRef<HTMLSpanElement>(null);
    const line2Ref = useRef<HTMLSpanElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const skillsStripRef = useRef<HTMLDivElement>(null);
    const counterTextRef = useRef<HTMLSpanElement>(null);
    const progressFillRef = useRef<HTMLDivElement>(null);
    const statusLabelRef = useRef<HTMLSpanElement>(null);

    const isTransitioningRef = useRef(false);
    const currentPathRef = useRef(pathname);

    // Keep current pathname ref up to date
    useEffect(() => {
        currentPathRef.current = pathname;
    }, [pathname]);

    const startTransition = (targetUrl: string) => {
        if (isTransitioningRef.current) return;

        const currentPath = currentPathRef.current.split("?")[0].split("#")[0];
        const destPath = targetUrl.split("?")[0].split("#")[0];

        // Skip if navigating to the same page
        if (currentPath === destPath) return;

        const overlay = overlayRef.current;
        const backdrop = backdropRef.current;
        const frameAccent = frameAccentRef.current;
        const frameMain = frameMainRef.current;

        if (!overlay || !backdrop || !frameAccent || !frameMain) {
            router.push(targetUrl);
            return;
        }

        isTransitioningRef.current = true;

        // Disable custom cursor blend mode during transition
        document.body.classList.add("page-transitioning");

        // Kill any previous tweens to prevent conflicts
        gsap.killTweensOf([
            overlay,
            backdrop,
            frameAccent,
            frameMain,
            line1Ref.current,
            line2Ref.current,
            imageRef.current,
            skillsStripRef.current,
            progressFillRef.current,
        ]);

        const counterObj = { val: 0 };
        if (counterTextRef.current) counterTextRef.current.textContent = "0";
        if (progressFillRef.current) progressFillRef.current.style.width = "0%";
        if (statusLabelRef.current) statusLabelRef.current.textContent = "INITIALIZING...";

        const tl = gsap.timeline({
            onComplete: () => {
                // Clean up: hide overlay, reset panel positions
                if (overlayRef.current) {
                    gsap.set(overlayRef.current, { display: "none", autoAlpha: 0 });
                }
                if (backdropRef.current) {
                    gsap.set(backdropRef.current, { autoAlpha: 0 });
                }
                if (frameAccentRef.current && frameMainRef.current) {
                    gsap.set([frameAccentRef.current, frameMainRef.current], { yPercent: 100 });
                }
                isTransitioningRef.current = false;

                // Re-enable cursor and refresh ScrollTrigger
                ScrollTrigger.refresh();
                document.body.classList.remove("page-transitioning");
            },
        });

        // ═══════════════════════════════════════════
        // INITIAL SETTINGS
        // ═══════════════════════════════════════════
        tl.set(overlay, { display: "block", autoAlpha: 1 })
            .set(backdrop, { autoAlpha: 1 })
            .set([frameAccent, frameMain], { yPercent: 100 })
            .set([line1Ref.current, line2Ref.current], { yPercent: 120, opacity: 0 })
            .set(imageRef.current, { scale: 1.15, opacity: 0 })
            .set(skillsStripRef.current, { y: 20, opacity: 0 })
            .set(progressFillRef.current, { width: "0%" });

        // ═══════════════════════════════════════════
        // PHASE 1 — ENTER: Black curtain slides up from bottom
        // ═══════════════════════════════════════════
        tl.to(frameAccent, {
            yPercent: 0,
            duration: 0.65,
            ease: "power4.inOut",
        })
        .to(
            frameMain,
            {
                yPercent: 0,
                duration: 0.65,
                ease: "power4.inOut",
            },
            0.08
        )

        // ═══════════════════════════════════════════
        // INNER ANIMATIONS: Text, image, skills, counter
        // ═══════════════════════════════════════════
        .to(
            line1Ref.current,
            {
                yPercent: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power4.out",
            },
            0.35
        )
        .to(
            line2Ref.current,
            {
                yPercent: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power4.out",
            },
            0.45
        )
        .to(
            imageRef.current,
            {
                scale: 1,
                opacity: 1,
                duration: 0.75,
                ease: "power3.out",
            },
            0.4
        )
        .to(
            skillsStripRef.current,
            {
                y: 0,
                opacity: 1,
                duration: 0.55,
                ease: "power3.out",
            },
            0.48
        )

        // Counter & Progress Bar: 0 -> 100%
        .to(
            counterObj,
            {
                val: 100,
                duration: 1.1,
                ease: "power2.inOut",
                onUpdate: () => {
                    const rounded = Math.round(counterObj.val);
                    if (counterTextRef.current) {
                        counterTextRef.current.textContent = `${rounded}`;
                    }
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
                            statusLabelRef.current.textContent = "COMPLETE";
                        }
                    }
                },
            },
            0.35
        )

        // ═══════════════════════════════════════════
        // PHASE 2 — NAVIGATE: Route change when 100% reached
        // ═══════════════════════════════════════════
        .add(() => {
            router.push(targetUrl);
            window.scrollTo(0, 0);
        })

        // Brief hold for new page components to mount cleanly
        .to({}, { duration: 0.35 })

        // ═══════════════════════════════════════════
        // PHASE 3 — EXIT: Panels slide up and away
        // ═══════════════════════════════════════════
        .to(
            frameMain,
            {
                yPercent: -100,
                duration: 0.8,
                ease: "power4.inOut",
            }
        )
        .to(
            frameAccent,
            {
                yPercent: -100,
                duration: 0.8,
                ease: "power4.inOut",
            },
            "<0.04"
        )

        // ═══════════════════════════════════════════
        // PHASE 4 — REVEAL: Backdrop fades out smoothly
        // ═══════════════════════════════════════════
        .to(backdrop, {
            autoAlpha: 0,
            duration: 0.35,
            ease: "power2.out",
        })
        .to(
            overlay,
            {
                autoAlpha: 0,
                duration: 0.1,
            },
            "-=0.1"
        );
    };

    // Event listeners for links and custom trigger
    useEffect(() => {
        const handleCustomTransition = (e: Event) => {
            const customEvent = e as CustomEvent<{ href: string }>;
            if (customEvent.detail?.href) {
                startTransition(customEvent.detail.href);
            }
        };

        const handleGlobalClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target) return;

            const anchor = target.closest("a") as HTMLAnchorElement | null;
            if (!anchor) return;

            const href = anchor.getAttribute("href");
            if (!href) return;

            // Handle internal navigation links only
            if (
                href.startsWith("/") &&
                !href.startsWith("//") &&
                anchor.target !== "_blank" &&
                !anchor.hasAttribute("download")
            ) {
                const currentPath = currentPathRef.current.split("?")[0].split("#")[0];
                const destPath = href.split("?")[0].split("#")[0];

                if (currentPath !== destPath) {
                    e.preventDefault();
                    startTransition(href);
                }
            }
        };

        window.addEventListener("trigger-page-transition", handleCustomTransition);
        document.addEventListener("click", handleGlobalClick, { capture: true });

        return () => {
            window.removeEventListener("trigger-page-transition", handleCustomTransition);
            document.removeEventListener("click", handleGlobalClick, { capture: true });
        };
    }, []);

    return (
        <div ref={overlayRef} className={styles.transitionOverlay} aria-hidden="true">
            {/* Solid black backdrop — stays while panels animate, hides GPU artifacts */}
            <div ref={backdropRef} className={styles.backdrop} />

            {/* Leading subtle accent curtain */}
            <div ref={frameAccentRef} className={styles.frameAccent} />

            {/* Main deep black curtain with the full transition design */}
            <div ref={frameMainRef} className={styles.frameMain}>
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
                            <span ref={counterTextRef}>0</span>
                            <span className={styles.percentSign}>%</span>
                        </div>

                        {/* Progress line */}
                        <div className={styles.progressTrack}>
                            <div
                                ref={progressFillRef}
                                className={styles.progressFill}
                                style={{ width: "0%" }}
                            />
                        </div>

                        <div className={styles.statusRow}>
                            <span ref={statusLabelRef} className={styles.statusLabel}>
                                LOADING ASSETS...
                            </span>
                            <span className={styles.statusLabel}>PLEASE WAIT</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
