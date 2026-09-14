"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import styles from "./portfolio.module.css"
import { RollingText } from "./RollingText"

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

        const mm = gsap.matchMedia();

        // 1. DESKTOP ONLY (> 768px): Exact same pinned horizontal scroll animation (100% untouched)
        mm.add("(min-width: 769px)", () => {
            const panels = gsap.utils.toArray<HTMLElement>(
                containerRef.current!.querySelectorAll(`.${styles.projectCard}`)
            )

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=4000",
                    pin: true,
                    scrub: 1,
                }
            })

            tl.to(titleRef.current, {
                fontSize: "7vw",
                y: "1vw",
                ease: "power2.inOut",
                duration: 1
            }, 0)

            gsap.set(contentRef.current, { opacity: 0, y: 60, filter: "blur(15px)" })
            tl.to(contentRef.current, {
                opacity: 1,
                y: -220,
                filter: "blur(0px)",
                ease: "power2.out",
                duration: 1
            }, 0)

            tl.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: "none",
                duration: 1
            }, 1)
        })

        // 2. MOBILE ONLY (<= 768px): Clean, smooth vertical card reveal (NO trapped 4000px scroll)
        mm.add("(max-width: 768px)", () => {
            gsap.set(contentRef.current, { opacity: 1, y: 0, filter: "none" })
            gsap.set(titleRef.current, { y: 0 })

            const cards = containerRef.current!.querySelectorAll(`.${styles.projectCard}`)
            cards.forEach((card) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 35,
                    duration: 0.7,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 88%",
                        toggleActions: "play none none reverse",
                    }
                })
            })
        })

        return () => mm.revert();
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
                        <div className={styles.ctaWrapper}>
                            <button className="primary-btn">
                                <span className="btnText">VIEW ALL PROJECTS</span>
                                <div className="btnIconCircle">
                                    <div className="arrowTrack">
                                        <div className="arrowIconPrimary">
                                            <ArrowRight size={16} strokeWidth={2.2} />
                                        </div>
                                        <div className="arrowIconSecondary">
                                            <ArrowRight size={16} strokeWidth={2.2} />
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className={styles.projectsGrid}>
                        {projects.map((project) => (
                            <div key={project.id} className={styles.projectCard}>
                                {/* Left Content */}
                                <div className={styles.cardContent}>
                                    <div className={styles.cardTop}>
                                        <div className={styles.tagsWrapper}>
                                            {project.tags.map(tag => (
                                                <span key={tag} className={styles.tagPill}>{tag}</span>
                                            ))}
                                        </div>

                                        <h4 className={styles.cardTitle}>{project.title}</h4>
                                    </div>

                                    <div className={styles.cardBottom}>
                                        <p className={styles.cardDescription}>
                                            {project.description}
                                        </p>

                                        <button className="primary-btn light">
                                            <span className="btnText">VIEW PROJECT</span>
                                            <div className="btnIconCircle">
                                                <div className="arrowTrack">
                                                    <div className="arrowIconPrimary">
                                                        <ArrowRight size={16} strokeWidth={2.2} />
                                                    </div>
                                                    <div className="arrowIconSecondary">
                                                        <ArrowRight size={16} strokeWidth={2.2} />
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
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
