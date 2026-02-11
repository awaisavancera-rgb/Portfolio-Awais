"use client"

import React, { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import styles from "./introScroll.module.css"

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP)

export const IntroScroll = () => {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const cardRef = useRef<HTMLDivElement>(null)
    const headlineRef = useRef<HTMLHeadingElement>(null)
    const footerBlocksRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        // Initial Styles - Anchored at the bottom of its 100vh container
        gsap.set(cardRef.current, {
            height: "15vh", // Small peek from the bottom
            width: "50%",
            backgroundColor: "#E5E5E5",
            borderTopLeftRadius: "40px",
            borderTopRightRadius: "40px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                pin: "#main-content",          // Pin the entire page's main content
                pinnedContainer: "#main-content",
                start: "top center",           // Trigger earlier for better visual flow
                end: "+=100%",                 // Expand over 100vh of scroll
                scrub: true,
                invalidateOnRefresh: true,
            }
        })

        // Expansion: Growth from bottom highlight to full screen
        tl.to(cardRef.current, {
            height: "100vh",
            width: "100%",
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            ease: "none"
        })

        // Color Transition: Shift to white as it nears completion
        tl.to(cardRef.current, {
            backgroundColor: "#FFFFFF",
            duration: 0.1, // Short duration at the end
            ease: "none"
        }, "-=0.2")

        // Reveal text staggered as expansion completes
        tl.from([headlineRef.current, footerBlocksRef.current?.children], {
            opacity: 0,
            y: 40,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.3")

    }, { scope: wrapperRef })

    return (
        <section ref={wrapperRef} className={styles.profileSection}>
            <div className={styles.container}>
                <div
                    ref={cardRef}
                    className={styles.card}
                >
                    <div className={styles.topRow}>
                        <span className={styles.profileLabel}>Profile</span>
                    </div>

                    <h1 ref={headlineRef} className={styles.mainHeadline}>
                        We transform bold ideas into standout brands through strategy, design, and marketing — all seamlessly integrated
                    </h1>

                    <div ref={footerBlocksRef} className={styles.bottomRow}>
                        <p className={styles.footerText}>
                            From day one, our mission has been to craft timeless identities that cut through the noise. Each year we collaborate with five teams to ensure unrivaled attention and dedication
                        </p>
                        <p className={styles.footerText}>
                            For over a decade, we&apos;ve partnered worldwide with founders to shape bold identities that redefine markets.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
