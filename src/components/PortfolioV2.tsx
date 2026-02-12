"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { ArrowUpRight } from "lucide-react"
import styles from "./portfolioV2.module.css"
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

export const PortfolioV2 = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const subheaderRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!titleRef.current || !sectionRef.current || !containerRef.current || !contentRef.current || !subheaderRef.current || !cardsRef.current) return

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=4000",
                pin: true,
                scrub: 1,
            }
        })

        // Step 1: Shrink "WORK" and Reveal Stationary Cards
        tl.fromTo(titleRef.current,
            { fontSize: "25vw", y: "0", opacity: 1 },
            { fontSize: "7vw", y: "-2vw", duration: 1.5, ease: "power2.inOut" }
        )
            .fromTo(contentRef.current,
                { opacity: 0, filter: "blur(15px)" },
                { opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.inOut" },
                "<" // Start together with shrinking
            )

        // Step 2: Slide Everything UP to center the cards and clear header
        tl.to([contentRef.current, titleRef.current], {
            y: (i) => i === 0 ? -220 : -120, // Content moves up more, title moves up enough
            duration: 1,
            ease: "power3.inOut"
        })

        // Step 3: Horizontal Scroll
        const panels = gsap.utils.toArray<HTMLElement>(
            cardsRef.current.querySelectorAll(`.${styles.projectCard}`)
        )

        tl.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            duration: 4, // Longer for control
        })

    }, { scope: sectionRef })

    return (
        <section ref={sectionRef} className={styles.portfolioSection}>
            <div ref={containerRef} className={styles.pinnedWrapper}>
                <div className={styles.heroTitleWrapper}>
                    <h2 ref={titleRef} className={styles.megaTitle}>WORK</h2>
                </div>

                <div ref={contentRef} className={styles.contentArea}>
                    <div ref={subheaderRef} className={styles.subheader}>
                        <h3 className={styles.selectedLabel}>SELECTED</h3>
                        <div className={styles.buttonWrapper}>
                            <Magnetic>
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
                            </Magnetic>
                        </div>
                    </div>

                    <div ref={cardsRef} className={styles.projectsGrid}>
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
