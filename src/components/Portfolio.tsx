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
import { Magnetic } from "./Magnetic"

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface Project {
    id: number
    title: string
    tags: string[]
    image: string
    description: string
}

const projects: Project[] = [
    {
        id: 1,
        title: "Colletre - Collage Dashboard",
        tags: ["Branding", "Website"],
        image: "/mockup-laptop.png",
        description: "Expertise A modern agency site crafted to highlight luxury, innovation, and award-winning marketing expertise",
    },
    {
        id: 2,
        title: "Saudi Lime Green",
        tags: ["Design", "Development"],
        image: "/mockup-watch.png",
        description: "A sustainable energy platform designed to showcase green initiatives and renewable technologies with a clean aesthetic.",
    },
    {
        id: 3,
        title: "Panda Automap",
        tags: ["App", "UI/UX"],
        image: "/mockup-laptop-3.png",
        description: "An intuitive navigation dashboard for autonomous vehicles, focusing on clarity, ease of use, and real-time data visualization.",
    },
]

export const Portfolio = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!titleRef.current || !sectionRef.current || !containerRef.current || !contentRef.current) return

        // Step 1: Title shrink
        gsap.fromTo(titleRef.current,
            { fontSize: "25vw", y: "0" },
            {
                fontSize: "7vw",
                y: "1vw",
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=400",
                    scrub: true,
                }
            }
        )

        // Step 2: Content blur-in
        gsap.fromTo(contentRef.current,
            { opacity: 0, y: 60, filter: "blur(15px)" },
            {
                opacity: 1,
                y: -220,
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
        const panels = gsap.utils.toArray<HTMLElement>(
            containerRef.current.querySelectorAll(`.${styles.projectCard}`)
        )

        gsap.to(panels, {
            xPercent: -100 * (panels.length - 1), // Standard horizontal scroll
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                end: "+=3000", // Longer scroll for wider cards
            }
        })

    }, { scope: sectionRef })

    return (
        <section ref={sectionRef} className={styles.portfolioSection}>
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
                            >
                                <RollingText text="Let's Talk" />
                                <span className="icon-circle">
                                    <ArrowUpRight size={16} />
                                </span>
                            </motion.button>
                        </div>
                    </div>

                    <div className={styles.projectsGrid}>
                        {projects.map((project) => (
                            <div key={project.id} className={styles.projectCard}>
                                {/* Left Content */}
                                <div className={styles.cardContent}>
                                    <div className={styles.tagsWrapper}>
                                        {project.tags.map(tag => (
                                            <span key={tag} className={styles.tagPill}>{tag}</span>
                                        ))}
                                    </div>

                                    <h4 className={styles.cardTitle}>{project.title}</h4>

                                    <p className={styles.cardDescription}>
                                        {project.description}
                                    </p>

                                    <Magnetic>
                                        <motion.button
                                            className="btn-talk"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <RollingText text="VIEW PROJECT" />
                                            <span className={styles.arrowIcon}>
                                                <ArrowUpRight size={16} />
                                            </span>
                                        </motion.button>
                                    </Magnetic>
                                </div>

                                {/* Right Image */}
                                <div className={styles.cardImageWrapper}>
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className={styles.cardImage}
                                        sizes="50vw"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
