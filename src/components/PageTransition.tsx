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
    const logoRef = useRef<HTMLDivElement>(null);

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
        const logo = logoRef.current;

        if (!overlay || !backdrop || !frameAccent || !frameMain || !logo) {
            router.push(targetUrl);
            return;
        }

        isTransitioningRef.current = true;

        // Disable custom cursor blend mode during transition
        document.body.classList.add("page-transitioning");

        // Kill any previous tweens to prevent conflicts
        gsap.killTweensOf([overlay, backdrop, frameAccent, frameMain, logo]);

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
        // PHASE 1 — ENTER: Black curtains slide up from the bottom
        // ═══════════════════════════════════════════

        tl.set(overlay, { display: "block", autoAlpha: 1 })
            .set(backdrop, { autoAlpha: 1 })
            .set([frameAccent, frameMain], { yPercent: 100 })
            .set(logo, { y: 35, autoAlpha: 0 })

            // Curtains slide up
            .to(frameAccent, {
                yPercent: 0,
                duration: 0.8,
                ease: "power4.inOut",
            })
            .to(
                frameMain,
                {
                    yPercent: 0,
                    duration: 0.8,
                    ease: "power4.inOut",
                },
                0.12
            )
            .to(
                logo,
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.5,
                    ease: "power3.out",
                },
                0.35
            )

            // ═══════════════════════════════════════════
            // PHASE 2 — NAVIGATE: Screen fully covered → change route
            // ═══════════════════════════════════════════

            .add(() => {
                router.push(targetUrl);
                window.scrollTo(0, 0);
            })

            // Hold 0.5s for new page to mount and render
            .to({}, { duration: 0.5 })

            // ═══════════════════════════════════════════
            // PHASE 3 — EXIT: Panels slide up, backdrop covers artifacts
            // ═══════════════════════════════════════════
            //
            // KEY INSIGHT: The black backdrop stays fully opaque while
            // panels slide up. This hides any GPU compositor tile
            // artifacts. Only AFTER panels are gone does the backdrop
            // fade out — by then the page is fully composited.

            // Logo fades out first
            .to(logo, {
                y: -25,
                autoAlpha: 0,
                duration: 0.35,
                ease: "power2.in",
            })

            // Panels slide up and away (backdrop still visible behind them!)
            .to(
                frameMain,
                {
                    yPercent: -100,
                    duration: 0.85,
                    ease: "power4.inOut",
                },
                "-=0.08"
            )
            .to(
                frameAccent,
                {
                    yPercent: -100,
                    duration: 0.85,
                    ease: "power4.inOut",
                },
                "<"
            )

            // ═══════════════════════════════════════════
            // PHASE 4 — REVEAL: Backdrop fades out to show the new page
            // ═══════════════════════════════════════════
            // Panels are now off-screen. The backdrop was covering
            // everything, so no white lines were ever visible.
            // Now fade the backdrop to reveal the fully-composited page.

            .to(backdrop, {
                autoAlpha: 0,
                duration: 0.4,
                ease: "power2.out",
            })

            // Final overlay cleanup
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

            {/* Main deep black curtain */}
            <div ref={frameMainRef} className={styles.frameMain} />

            {/* Minimal refined luxury typography */}
            <div ref={logoRef} className={styles.logoWrapper}>
                <span className={styles.brandTitle}>AWAIS</span>
                <div className={styles.brandLine} />
                <span className={styles.brandSub}>SELECTED WORKS</span>
            </div>
        </div>
    );
}
