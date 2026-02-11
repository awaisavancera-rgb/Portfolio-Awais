"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { ArrowUpRight } from "lucide-react"
import styles from "./portfolio.module.css"
import { RollingText } from "./RollingText"

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface Project {
    id: number
    title: string
    tags: string[]
    image: string
}

const projects: Project[] = [
    {
        id: 1,
        title: "Kashtech Doyel",
        tags: ["2025 - Design"],
        image: "/mockup-laptop.png",
    },
    {
        id: 2,
        title: "Saudi Lime Green",
        tags: ["2025 - Design"],
        image: "/mockup-watch.png",
    },
    {
        id: 3,
        title: "Panda Automap",
        tags: ["2025 - Design"],
        image: "/mockup-laptop-3.png",
    },
]

export const Portfolio = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!titleRef.current || !sectionRef.current || !containerRef.current || !contentRef.current) return

        // Step 1: Title shrink — only starts once portfolio covers the entire screen
        gsap.fromTo(titleRef.current,
            { fontSize: "25vw", y: "0" },
            {
                fontSize: "7vw",
                y: "2.5vw",
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=400",
                    scrub: true,
                }
            }
        )

        // Step 2: Content blur-in — starts as title finishes shrinking
        gsap.fromTo(contentRef.current,
            { opacity: 0, y: 60, filter: "blur(15px)" },
            {
                opacity: 1,
                y: -180,
                filter: "blur(0px)",
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top -200",
                    end: "top -500",
                    scrub: true,
                }
            }
        )

        // Step 3: Horizontal scroll
        // Get all the card panels
        const panels = gsap.utils.toArray<HTMLElement>(
            containerRef.current.querySelectorAll(`.${styles.projectCard}`)
        )

        // Cards are 38vw each. 2.5 visible = ~95vw used.
        // Overflow ≈ 118vw - 100vw = ~18vw. 18/38 = ~50% of card width.
        gsap.to(panels, {
            xPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                end: "+=2000",
            }
        })

    }, { scope: sectionRef })

    return (
        <section ref={sectionRef} className={styles.portfolioSection}>
            {/* This is the pinned container — like .container in the GSAP example */}
            <div ref={containerRef} className={styles.pinnedWrapper}>
                <div className={styles.heroTitleWrapper}>
                    <h2 ref={titleRef} className={styles.megaTitle}>WORK</h2>
                </div>

                <div ref={contentRef} className={styles.contentArea}>
                    <div className={styles.subheader}>
                        <h3 className={styles.selectedLabel}>SELECTED</h3>
                        <div className={styles.buttonWrapper}>
                            <motion.button
                                className="btn-talk"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onMouseMove={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = e.clientX - rect.left - rect.width / 2;
                                    const y = e.clientY - rect.top - rect.height / 2;
                                    e.currentTarget.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = `translate(0px, 0px)`;
                                }}
                                style={{ transition: 'transform 0.1s ease-out' }}
                            >
                                <RollingText text="Let's Talk" />
                                <span className="icon-circle">
                                    <ArrowUpRight size={16} />
                                </span>
                            </motion.button>
                        </div>
                    </div>

                    {/* This is the horizontal track — like the flex panels in the GSAP example */}
                    <div className={styles.projectsGrid}>
                        {projects.map((project) => (
                            <div key={project.id} className={styles.projectCard}>
                                <div className={styles.projectImageWrapper}>
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className={styles.projectImage}
                                        sizes="45vw"
                                    />
                                </div>
                                <div className={styles.projectInfo}>
                                    <h4 className={styles.projectTitle}>{project.title}</h4>
                                    <div className={styles.projectTags}>
                                        {project.tags.map(tag => (
                                            <span key={tag} className={styles.projectTag}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
