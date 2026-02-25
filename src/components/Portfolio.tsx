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

        const panels = gsap.utils.toArray<HTMLElement>(
            containerRef.current.querySelectorAll(`.${styles.projectCard}`)
        )

        // Create a single timeline for the entire sequence
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=4000", // Total scroll distance
                pin: true,
                scrub: 1,
            }
        })

        // Step 1: Title shrink AND Content blur-in happen together
        tl.to(titleRef.current, {
            fontSize: "7vw",
            y: "1vw",
            ease: "power2.inOut",
            duration: 1
        }, 0)

        // Content starts blurred and lower, then moves up and clears
        gsap.set(contentRef.current, { opacity: 0, y: 60, filter: "blur(15px)" })
        tl.to(contentRef.current, {
            opacity: 1,
            y: -220,
            filter: "blur(0px)",
            ease: "power2.out",
            duration: 1
        }, 0)

        // Step 2: Horizontal scroll happens AFTER the reveal is complete
        tl.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            duration: 1 // Takes up the rest of the scroll distance
        }, 1) // Starts at 1 second (after the 1 second reveal)

    }, { scope: sectionRef })

    return (
        <section ref={sectionRef} className={styles.portfolioSection}>
            <div ref={containerRef} className={styles.pinnedWrapper}>
                <div className={styles.heroTitleWrapper}>
                    <h2 ref={titleRef} className={styles.megaTitle}>WORKS</h2>
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
