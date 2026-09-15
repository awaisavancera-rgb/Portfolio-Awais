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

/**
 * Force a full compositor repaint to eliminate GPU tiling artifacts.
 * This is needed because mix-blend-mode: difference on the custom cursor
 * creates isolated compositor layers that don't properly invalidate
 * after large transform animations (the page transition panels).
 */
function forceFullRepaint() {
    // 1. Toggle a zero-impact CSS property on <html> to dirty the entire render tree
    const html = document.documentElement;
    html.style.transform = "translateZ(0)";
    // Force a synchronous reflow
    void html.offsetHeight;
    // Remove immediately - the reflow already happened
    requestAnimationFrame(() => {
        html.style.transform = "";
    });

    // 2. Refresh ScrollTrigger positions after new page content
    ScrollTrigger.refresh();
}

export function PageTransition() {
    const pathname = usePathname();
    const router = useRouter();

    const overlayRef = useRef<HTMLDivElement>(null);
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
        const frameAccent = frameAccentRef.current;
        const frameMain = frameMainRef.current;
        const logo = logoRef.current;

        if (!overlay || !frameAccent || !frameMain || !logo) {
            router.push(targetUrl);
            return;
        }

        isTransitioningRef.current = true;

        // Disable custom cursor blend mode during transition to prevent GPU compositor artifacts
        document.body.classList.add("page-transitioning");

        // Kill any previous tweens on these elements to prevent conflicts
        gsap.killTweensOf([overlay, frameAccent, frameMain, logo]);

        // Single continuous, guaranteed-to-finish GSAP timeline
        const tl = gsap.timeline({
            onComplete: () => {
                if (overlayRef.current) {
                    gsap.set(overlayRef.current, { display: "none", autoAlpha: 0 });
                }
                if (frameAccentRef.current && frameMainRef.current) {
                    gsap.set([frameAccentRef.current, frameMainRef.current], { yPercent: 100 });
                }
                isTransitioningRef.current = false;

                // Re-enable cursor blend mode after a brief delay to let GPU settle
                requestAnimationFrame(() => {
                    forceFullRepaint();
                    requestAnimationFrame(() => {
                        document.body.classList.remove("page-transitioning");
                    });
                });
            },
        });

        // 1. Initial positioning at the bottom
        tl.set(overlay, { display: "block", autoAlpha: 1 })
            .set([frameAccent, frameMain], { yPercent: 100 })
            .set(logo, { y: 35, autoAlpha: 0 })

            // 2. ENTER: Curtains slide up from the bottom
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

            // 3. NAVIGATE: Screen is 100% solid black, push route and scroll top
            .add(() => {
                router.push(targetUrl);
                window.scrollTo(0, 0);
            })

            // 4. HOLD DELAY: 0.5s deliberate pause for luxury feel and new page mount
            .to({}, { duration: 0.5 })

            // 5. EXIT: Curtains smoothly slide up and away to reveal the new page
            .to(logo, {
                y: -25,
                autoAlpha: 0,
                duration: 0.35,
                ease: "power2.in",
            })
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
            .to(
                overlay,
                {
                    autoAlpha: 0,
                    duration: 0.15,
                },
                "-=0.15"
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
