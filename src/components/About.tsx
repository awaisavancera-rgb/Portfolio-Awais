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
import { AtomIcon } from "./AtomIcon"
import { FigmaIcon } from "./icons/FigmaIcon"
import { GithubIcon } from "./icons/GithubIcon"
import { FirebaseIcon } from "./icons/FirebaseIcon"
import { FramerIcon } from "./icons/FramerIcon"

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
                            About<sup className={styles.sup}>Awais</sup>
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
                        <div className={styles.portraitWrapper}>
                            <Image
                                src="/mockup-laptop-3.png"
                                alt="Portrait"
                                fill
                                className={styles.portraitImage}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    {/* Right: Text Content + Contact Button + Logos */}
                    <div ref={contentRef} className={styles.textColumn}>
                        <div className={styles.headlineWrapper}>
                            <h2 className={styles.headline}>
                                13+ years<sup className={styles.tm}>TM</sup> of digital form, sharp interactions, and relentless creative discipline and effort.
                            </h2>
                            {/* Contact Button Moved Here (Aligned Left via CSS) */}
                            <div className={styles.footerCTA}>
                                <Magnetic strength={-0.1}>
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

                        {/* Status Bar */}
                        <div className={styles.statusBar}>
                            <span className={styles.statusLabel}>Freelancer</span>
                            <span className={styles.statusLabel}>Stack I'm working on</span>
                            <span className={styles.statusLabel}>Creative Developer</span>
                        </div>

                        {/* Logo Grid Marquee */}
                        <div className={styles.marqueeContainer}>
                            <div className={styles.marqueeTrack}>
                                {/* First Set */}
                                <div ref={gridRef} className={styles.logoGridWrapper}>
                                    <div className={styles.logoRow}>
                                        <div className={`${styles.logoItem} ${styles.radiusTL}`}>
                                            <div className={styles.iconBox}>
                                                <svg className={styles.logoSvg} viewBox="0 0 128 128"><path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 59.6V100H40V28h8.5l50.8 73.4c6.3-8.4 10.1-18.8 10.1-30.1c0-26.1-15.6-48.5-37.9-58.3l7.4-12.8C105.1 11.5 128 35.1 128 64c0 35.3-28.7 64-64 64c-13.1 0-25.3-3.9-35.5-10.7L109.2 34c4.3 9.1 6.8 19.3 6.8 30c0 14.8-4.7 28.6-12.7 39.8L64 28h-8.5v41.4l50.8 71.9C90.2 122.9 77.8 128 64 128c-35.3 0-64-28.7-64-64S28.7 0 64 0z" /></svg>
                                            </div>
                                            <span className={styles.logoText}>Next.js</span>
                                        </div>
                                        <div className={styles.logoItemEmpty}></div>
                                        <div className={`${styles.logoItem} ${styles.radiusTop}`}>
                                            <div className={styles.iconBox}>
                                                <AtomIcon size="2.2vw" />
                                            </div>
                                            <span className={styles.logoText}>React</span>
                                        </div>
                                        <div className={styles.logoItemEmpty}></div>
                                        <div className={`${styles.logoItem} ${styles.radiusTop}`}>
                                            <div className={styles.iconBox}>
                                                <FigmaIcon size="2.2vw" />
                                            </div>
                                            <span className={styles.logoText}>Figma</span>
                                        </div>
                                        <div className={styles.logoItemEmpty}></div>
                                        <div className={`${styles.logoItem} ${styles.radiusTop}`}>
                                            <div className={styles.iconBox}>
                                                <GithubIcon size="2.2vw" />
                                            </div>
                                            <span className={styles.logoText}>Github</span>
                                        </div>
                                        <div className={styles.logoItemEmpty}></div>
                                        <div className={`${styles.logoItem} ${styles.radiusTR}`}>
                                            <div className={styles.iconBox}>
                                                <svg className={styles.logoSvg} viewBox="0 0 24 24"><path fill="currentColor" d="M21.4737 5.6842c-1.1772 0 -2.1663 0.8051 -2.4468 1.8947h-2.8955c-1.235 0 -2.289 0.893 -2.492 2.111l-0.1038 0.623a1.263 1.263 0 0 1 -1.246 1.0555H11.289c-0.2805 -1.0896 -1.2696 -1.8947 -2.4468 -1.8947s-2.1663 0.8051 -2.4467 1.8947H4.973c-0.2805 -1.0896 -1.2696 -1.8947 -2.4468 -1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663 -0.8051 2.4468 -1.8947h1.4223c0.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663 -0.8051 2.4468 -1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l0.1038 0.623c0.203 1.218 1.257 2.111 2.492 2.111h0.3692c0.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263 -1.131 2.5263 -2.5263s-1.131 -2.5263 -2.5263 -2.5263c-1.1772 0 -2.1664 0.805 -2.4468 1.8947h-0.3692a1.263 1.263 0 0 1 -1.246 -1.0555l-0.1037 -0.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 0.821 -1.4794l0.1038 -0.623a1.263 1.263 0 0 1 1.2459 -1.0555h2.8955c0.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263 -1.131 2.5263 -2.5263s-1.131 -2.5263 -2.5263 -2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1 -1.2631 1.2632 1.263 1.263 0 0 1 -1.2632 -1.2632 1.263 1.263 0 0 1 1.2632 -1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1 -1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631 -1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1 -1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632 -1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1 -1.2631 1.2631 1.263 1.263 0 0 1 -1.2632 -1.2631 1.263 1.263 0 0 1 1.2632 -1.2632" /></svg>
                                            </div>
                                            <span className={styles.logoText}>n8n</span>
                                        </div>
                                    </div>

                                    <div className={styles.logoRow}>
                                        <div className={styles.logoItemEmpty}></div>
                                        <div className={`${styles.logoItem} ${styles.radiusBottom}`}>
                                            <div className={styles.iconBox}>
                                                <FirebaseIcon size="2.2vw" />
                                            </div>
                                            <span className={styles.logoText}>Firebase</span>
                                        </div>
                                        <div className={styles.logoItemEmpty}></div>
                                        <div className={`${styles.logoItem} ${styles.radiusBottom}`}>
                                            <div className={styles.iconBox}>
                                                <FramerIcon size="2.2vw" />
                                            </div>
                                            <span className={styles.logoText}>Framer</span>
                                        </div>
                                        <div className={styles.logoItemEmpty}></div>
                                        <div className={`${styles.logoItem} ${styles.radiusBottom}`}>
                                            <div className={styles.iconBox}>
                                                <svg className={styles.logoSvg} viewBox="0 0 128 128"><path fill="currentColor" d="M1.5 63.9c0-10.5 2.1-20.5 6.2-29.7l30.2 5.1c-1.7 8-2.6 16.2-2.6 24.6c0 1.2 0 2.4.1 3.6L5.3 75c-2.5-3.6-3.8-7.3-3.8-11.1zm110.1-11.1L81.5 47.9c1.7-8 2.6-16.2 2.6-24.6c0-1.2 0-2.4-.1-3.6l30.1-7.5c2.5 3.6 3.8 7.3 3.8 11.1c0 10.5-2.1 20.5-6.3 29.5zM64 1.5c10.5 0 20.5 2.1 29.7 6.2l-5.1 30.2c-8-1.7-16.2-2.6-24.6-2.6c-1.2 0-2.4 0-3.6.1L53 5.3c3.6-2.5 7.3-3.8 11-3.8zm11.1 110.1l4.9-30.2c8 1.7 16.2 2.6 24.6 2.6c1.2 0 2.4 0 3.6-.1l7.5 30.1c-3.6 2.5-7.3 3.8-11.1 3.8c-10.5 0-20.5-2.1-29.5-6.2zM126.5 64.1c0 10.5-2.1 20.5-6.2 29.7l-30.2-5.1c1.7-8 2.6-16.2 2.6-24.6c0-1.2 0-2.4-.1-3.6l30.1-7.5c2.5 3.6 3.8 7.3 3.8 11.1zm-110.1 11.1l30.1 4.9c-1.7 8-2.6 16.2-2.6 24.6c0 1.2 0 2.4.1 3.6L3.9 95.8c-2.5-3.6-3.9-7.3-3.9-11.1c0-10.5 2.1-20.5 6.3-29.6zM64 126.5c-10.5 0-20.5-2.1-29.7-6.2l5.1-30.2c8 1.7 16.2 2.6 24.6 2.6c1.2 0 2.4 0 3.6-.1l7.5 30.1c-3.6 2.5-7.3 3.8-11.1 3.8zm-11.1-110.1l-4.9 30.2c-8-1.7-16.2-2.6-24.6-2.6c-1.2 0-2.4 0-3.6.1L17.9 3.9C21.5 1.4 25.2 0.1 29 0.1c10.5 0 20.5 2.1 29.6 6.3z" /></svg>
                                            </div>
                                            <span className={styles.logoText}>GSAP</span>
                                        </div>
                                        <div className={styles.logoItemEmpty}></div>
                                        <div className={`${styles.logoItem} ${styles.radiusBottom}`}>
                                            <div className={styles.iconBox}>
                                                <svg className={styles.logoSvg} viewBox="0 0 128 128"><path fill="currentColor" d="M1.5 11.9c0-5.7 4.7-10.4 10.4-10.4h104.2c5.7 0 10.4 4.7 10.4 10.4v104.2c0 5.7-4.7 10.4-10.4 10.4H11.9c-5.7 0-10.4-4.7-10.4-10.4V11.9zM114.1 114.1V13.9H13.9v100.2h100.2zM32.5 30.3h42.1v9.2H58.8v58.2h-10.5V39.5H32.5v-9.2zm43.3 33.4c0-2.9 0.6-5.5 1.8-7.7c1.2-2.3 2.8-4 4.8-5.2c2-1.2 4.4-1.8 7.1-1.8c2.4 0 4.5 0.5 6.4 1.4c1.8 0.9 3.3 2.2 4.4 3.9V30.3h10.5v68.2H100v-7.1c-1.1 2.3-2.6 4.1-4.7 5.4c-2.1 1.3-4.5 1.9-7.3 1.9c-3.6 0-6.6-0.8-9.1-2.5c-2.5-1.7-4.3-4-5.5-6.9c-1.2-2.9-1.8-6.4-1.8-10.5V63.7zm10.5 0.1c0 3.3 0.6 5.8 1.7 7.6c1.1 1.8 2.8 2.7 5.1 2.7s4.1-.9 5.2-2.7c1.1-1.8 1.6-4.3 1.6-7.6v-1.7c0-3.3-0.5-5.8-1.6-7.6c-1.1-1.8-2.8-2.7-5.2-2.7s-4 0.9-5.1 2.7c-1.1 1.8-1.7 4.3-1.7 7.6v1.7z" /></svg>
                                            </div>
                                            <span className={styles.logoText}>TypeScript</span>
                                        </div>
                                        <div className={styles.logoItemEmpty}></div>
                                    </div>
                                </div>

                                {/* Second set for seamless loop */}
                                <div className={styles.logoGridWrapper}>
                                    <div className={styles.logoRow}>
                                        <div className={`${styles.logoItem} ${styles.radiusTL}`}>
                                            <div className={styles.iconBox}>
                                                <svg className={styles.logoSvg} viewBox="0 0 128 128"><path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 59.6V100H40V28h8.5l50.8 73.4c6.3-8.4 10.1-18.8 10.1-30.1c0-26.1-15.6-48.5-37.9-58.3l7.4-12.8C105.1 11.5 128 35.1 128 64c0 35.3-28.7 64-64 64c-13.1 0-25.3-3.9-35.5-10.7L109.2 34c4.3 9.1 6.8 19.3 6.8 30c0 14.8-4.7 28.6-12.7 39.8L64 28h-8.5v41.4l50.8 71.9C90.2 122.9 77.8 128 64 128c-35.3 0-64-28.7-64-64S28.7 0 64 0z" /></svg>
                                            </div>
                                            <span className={styles.logoText}>Next.js</span>
                                        </div>
                                        <div className={styles.logoItemEmpty}></div>
                                        <div className={`${styles.logoItem} ${styles.radiusTop}`}>
                                            <div className={styles.iconBox}>
                                                <AtomIcon size="2.2vw" />
                                            </div>
                                            <span className={styles.logoText}>React</span>
                                        </div>
                                        <div className={styles.logoItemEmpty}></div>
                                        <div className={`${styles.logoItem} ${styles.radiusTop}`}>
                                            <div className={styles.iconBox}>
                                                <FigmaIcon size="2.2vw" />
                                            </div>
                                            <span className={styles.logoText}>Figma</span>
                                        </div>
                                        <div className={styles.logoItemEmpty}></div>
                                        <div className={`${styles.logoItem} ${styles.radiusTop}`}>
                                            <div className={styles.iconBox}>
                                                <GithubIcon size="2.2vw" />
                                            </div>
                                            <span className={styles.logoText}>Github</span>
                                        </div>
                                        <div className={styles.logoItemEmpty}></div>
                                        <div className={`${styles.logoItem} ${styles.radiusTR}`}>
                                            <div className={styles.iconBox}>
                                                <svg className={styles.logoSvg} viewBox="0 0 24 24"><path fill="currentColor" d="M21.4737 5.6842c-1.1772 0 -2.1663 0.8051 -2.4468 1.8947h-2.8955c-1.235 0 -2.289 0.893 -2.492 2.111l-0.1038 0.623a1.263 1.263 0 0 1 -1.246 1.0555H11.289c-0.2805 -1.0896 -1.2696 -1.8947 -2.4468 -1.8947s-2.1663 0.8051 -2.4467 1.8947H4.973c-0.2805 -1.0896 -1.2696 -1.8947 -2.4468 -1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663 -0.8051 2.4468 -1.8947h1.4223c0.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663 -0.8051 2.4468 -1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l0.1038 0.623c0.203 1.218 1.257 2.111 2.492 2.111h0.3692c0.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263 -1.131 2.5263 -2.5263s-1.131 -2.5263 -2.5263 -2.5263c-1.1772 0 -2.1664 0.805 -2.4468 1.8947h-0.3692a1.263 1.263 0 0 1 -1.246 -1.0555l-0.1037 -0.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 0.821 -1.4794l0.1038 -0.623a1.263 1.263 0 0 1 1.2459 -1.0555h2.8955c0.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263 -1.131 2.5263 -2.5263s-1.131 -2.5263 -2.5263 -2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1 -1.2631 1.2632 1.263 1.263 0 0 1 -1.2632 -1.2632 1.263 1.263 0 0 1 1.2632 -1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1 -1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631 -1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1 -1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632 -1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1 -1.2631 1.2631 1.263 1.263 0 0 1 -1.2632 -1.2631 1.263 1.263 0 0 1 1.2632 -1.2632" /></svg>
                                            </div>
                                            <span className={styles.logoText}>n8n</span>
                                        </div>
                                    </div>

                                    <div className={styles.logoRow}>
                                        <div className={styles.logoItemEmpty}></div>
                                        <div className={`${styles.logoItem} ${styles.radiusBottom}`}>
                                            <div className={styles.iconBox}>
                                                <FirebaseIcon size="2.2vw" />
                                            </div>
                                            <span className={styles.logoText}>Firebase</span>
                                        </div>
                                        <div className={styles.logoItemEmpty}></div>
                                        <div className={`${styles.logoItem} ${styles.radiusBottom}`}>
                                            <div className={styles.iconBox}>
                                                <FramerIcon size="2.2vw" />
                                            </div>
                                            <span className={styles.logoText}>Framer</span>
                                        </div>
                                        <div className={styles.logoItemEmpty}></div>
                                        <div className={`${styles.logoItem} ${styles.radiusBottom}`}>
                                            <div className={styles.iconBox}>
                                                <svg className={styles.logoSvg} viewBox="0 0 128 128"><path fill="currentColor" d="M1.5 63.9c0-10.5 2.1-20.5 6.2-29.7l30.2 5.1c-1.7 8-2.6 16.2-2.6 24.6c0 1.2 0 2.4.1 3.6L5.3 75c-2.5-3.6-3.8-7.3-3.8-11.1zm110.1-11.1L81.5 47.9c1.7-8 2.6-16.2 2.6-24.6c0-1.2 0-2.4-.1-3.6l30.1-7.5c2.5 3.6 3.8 7.3 3.8 11.1c0 10.5-2.1 20.5-6.3 29.5zM64 1.5c10.5 0 20.5 2.1 29.7 6.2l-5.1 30.2c-8-1.7-16.2-2.6-24.6-2.6c-1.2 0-2.4 0-3.6.1L53 5.3c3.6-2.5 7.3-3.8 11-3.8zm11.1 110.1l4.9-30.2c8 1.7 16.2 2.6 24.6 2.6c1.2 0 2.4 0 3.6-.1l7.5 30.1c-3.6 2.5-7.3 3.8-11.1 3.8c-10.5 0-20.5-2.1-29.5-6.2zM126.5 64.1c0 10.5-2.1 20.5-6.2 29.7l-30.2-5.1c1.7-8 2.6-16.2 2.6-24.6c0-1.2 0-2.4-.1-3.6l30.1-7.5c2.5 3.6 3.8 7.3 3.8 11.1zm-110.1 11.1l30.1 4.9c-1.7 8-2.6 16.2-2.6 24.6c0 1.2 0 2.4.1 3.6L3.9 95.8c-2.5-3.6-3.9-7.3-3.9-11.1c0-10.5 2.1-20.5 6.3-29.6zM64 126.5c-10.5 0-20.5-2.1-29.7-6.2l5.1-30.2c8 1.7 16.2 2.6 24.6 2.6c1.2 0 2.4 0 3.6-.1l7.5 30.1c-3.6 2.5-7.3 3.8-11.1 3.8zm-11.1-110.1l-4.9 30.2c-8-1.7-16.2-2.6-24.6-2.6c-1.2 0-2.4 0-3.6.1L17.9 3.9C21.5 1.4 25.2 0.1 29 0.1c10.5 0 20.5 2.1 29.6 6.3z" /></svg>
                                            </div>
                                            <span className={styles.logoText}>GSAP</span>
                                        </div>
                                        <div className={styles.logoItemEmpty}></div>
                                        <div className={`${styles.logoItem} ${styles.radiusBottom}`}>
                                            <div className={styles.iconBox}>
                                                <svg className={styles.logoSvg} viewBox="0 0 128 128"><path fill="currentColor" d="M1.5 11.9c0-5.7 4.7-10.4 10.4-10.4h104.2c5.7 0 10.4 4.7 10.4 10.4v104.2c0 5.7-4.7 10.4-10.4 10.4H11.9c-5.7 0-10.4-4.7-10.4-10.4V11.9zM114.1 114.1V13.9H13.9v100.2h100.2zM32.5 30.3h42.1v9.2H58.8v58.2h-10.5V39.5H32.5v-9.2zm43.3 33.4c0-2.9 0.6-5.5 1.8-7.7c1.2-2.3 2.8-4 4.8-5.2c2-1.2 4.4-1.8 7.1-1.8c2.4 0 4.5 0.5 6.4 1.4c1.8 0.9 3.3 2.2 4.4 3.9V30.3h10.5v68.2H100v-7.1c-1.1 2.3-2.6 4.1-4.7 5.4c-2.1 1.3-4.5 1.9-7.3 1.9c-3.6 0-6.6-0.8-9.1-2.5c-2.5-1.7-4.3-4-5.5-6.9c-1.2-2.9-1.8-6.4-1.8-10.5V63.7zm10.5 0.1c0 3.3 0.6 5.8 1.7 7.6c1.1 1.8 2.8 2.7 5.1 2.7s4.1-.9 5.2-2.7c1.1-1.8 1.6-4.3 1.6-7.6v-1.7c0-3.3-0.5-5.8-1.6-7.6c-1.1-1.8-2.8-2.7-5.2-2.7s-4 0.9-5.1 2.7c-1.1 1.8-1.7 4.3-1.7 7.6v1.7z" /></svg>
                                            </div>
                                            <span className={styles.logoText}>TypeScript</span>
                                        </div>
                                        <div className={styles.logoItemEmpty}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

