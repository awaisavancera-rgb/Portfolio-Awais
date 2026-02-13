"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import styles from "./about.module.css"
import Image from "next/image"

import { ArrowUpRight } from "lucide-react"
import { RollingText } from "./RollingText"
import { motion } from "framer-motion"
import { Magnetic } from "./Magnetic"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const About = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!sectionRef.current || !titleRef.current || !imageRef.current || !contentRef.current || !gridRef.current) return

        // 1. Massive Title Reveal (Slide Up)
        gsap.fromTo(titleRef.current,
            { y: "100%" },
            {
                y: "0%",
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            }
        )

        // 2. Image Scale Reveal
        gsap.fromTo(imageRef.current,
            { scale: 1.2, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: "top 85%",
                }
            }
        )

        // 3. Content Fade In
        gsap.fromTo(contentRef.current.children,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: "top 85%",
                }
            }
        )

        // 4. Logo Grid Stagger
        const logos = gridRef.current.children
        gsap.fromTo(logos,
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 90%",
                }
            }
        )

    }, { scope: sectionRef })

    return (
        <section ref={sectionRef} className={styles.aboutSection}>
            <div className={styles.container}>

                {/* 1. Header Area with Massive Title */}
                <div className={styles.titleWrapper}>
                    <h1 className={styles.massiveTitle}>
                        <span ref={titleRef}>
                            Awais<sup className={styles.sup}>TM</sup>
                        </span>
                    </h1>
                </div>

                {/* New Skills Strip */}
                <div className={styles.skillsStrip}>
                    <span>Freelancer</span>
                    <span>Digital Nomad</span>
                    <span>Creative Developer</span>
                </div>

                <div className={styles.metaBar}>
                    <span>© Curated Interfaces</span>
                    <span>(WDX® — 02)</span>
                    <span>Digital Designer</span>
                </div>

                {/* 2. Split Content */}
                <div className={styles.contentGrid}>
                    {/* Left: Portrait Image */}
                    <div ref={imageRef} className={styles.imageColumn}>
                        <Image
                            src="/mockup-laptop-3.png" // Placeholder - likely want a user portrait here
                            alt="Portrait"
                            fill
                            className={styles.portraitImage}
                            style={{ objectFit: 'cover' }}
                        />
                    </div>

                    {/* Right: Text Content */}
                    <div ref={contentRef} className={styles.textColumn}>
                        <div>
                            <h2 className={styles.headline}>
                                13+ years<sup className={styles.tm}>TM</sup> of digital form, sharp interactions, and relentless creative discipline and effort.
                            </h2>
                        </div>

                        {/* Logo Grid */}
                        <div ref={gridRef} className={styles.logoGridWrapper}>
                            <div className={styles.logoRow}>
                                <div className={`${styles.logoItem} ${styles.radiusTL}`}>
                                    <span className={styles.logoText}>Cairo</span>
                                </div>
                                <div className={styles.logoItemEmpty}></div>
                                <div className={`${styles.logoItem} ${styles.radiusTop}`}>
                                    <span className={styles.logoText}>oslo.</span>
                                </div>
                                <div className={styles.logoItemEmpty}></div>
                                <div className={`${styles.logoItem} ${styles.radiusTR}`}>
                                    <span className={styles.logoText}>:::Chain</span>
                                </div>
                            </div>

                            <div className={styles.logoRow}>
                                <div className={styles.logoItemEmpty}></div>
                                <div className={`${styles.logoItem} ${styles.radiusBottom}`}>
                                    <span className={styles.logoText}>Manila.</span>
                                </div>
                                <div className={styles.logoItemEmpty}></div>
                                <div className={`${styles.logoItem} ${styles.radiusBottom}`}>
                                    <span className={styles.logoText}>ther</span>
                                </div>
                                <div className={styles.logoItemEmpty}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.footerCTA}>
                    <Magnetic>
                        <motion.button
                            className="btn-talk"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <RollingText text="Contact" />
                            <span className="icon-circle">
                                <ArrowUpRight size={16} />
                            </span>
                        </motion.button>
                    </Magnetic>
                </div>
            </div>
        </section>
    )
}

