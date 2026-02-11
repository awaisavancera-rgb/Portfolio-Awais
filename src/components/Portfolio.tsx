"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, MoveDown } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import styles from "./portfolio.module.css"
import { RollingText } from "./RollingText"

// Register GSAP plugins
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
        title: "Lorikeet CX",
        tags: ["Motion & 3D", "Web Development"],
        image: "/mockup-laptop.png",
    },
    {
        id: 2,
        title: "Teak",
        tags: ["Motion & 3D", "Web Development"],
        image: "/mockup-phone.png",
    },
    {
        id: 3,
        title: "We Scale It",
        tags: ["Brand Identity", "Web Design & Development"],
        image: "/mockup-watch.png",
    },
    {
        id: 4,
        title: "Kastle AI",
        tags: ["Motion & 3D", "Web Design & Development"],
        image: "/mockup-display.png",
    },
    {
        id: 5,
        title: "Jeremie Bouchard | Director + Editor",
        tags: ["Brand Identity", "Web Design & Development"],
        image: "/mockup-laptop-2.png",
    },
    {
        id: 6,
        title: "Kimu - Agence Créative",
        tags: ["Web Design & Development"],
        image: "/mockup-laptop-3.png",
    },
]

// Background colors for cards
const cardBackgrounds = [
    "#efede7", // cream
    "#e5d6c8", // soft tan
    "#1a1a1a", // dark
    "#fcece8", // light pink
    "#bb2a2a", // deep red
    "#d8e0c3", // soft green
]

export const Portfolio = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!scrollContainerRef.current || !cardsRef.current) return

        const cards = cardsRef.current.children
        const cardWidth = 600 // Width of each card including gap
        const visibleCards = 2
        const totalSlides = Math.ceil(projects.length / visibleCards)
        const maxScroll = (totalSlides - 1) * cardWidth * visibleCards

        // Create horizontal scroll animation
        const scrollTween = gsap.to(cardsRef.current, {
            x: -maxScroll,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
            }
        })

        // Animate cards on scroll
        gsap.fromTo(cards, 
            {
                opacity: 0,
                y: 100,
                scale: 0.8
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "top 20%",
                    toggleActions: "play none none reverse"
                }
            }
        )

        return () => {
            scrollTween.kill()
        }
    }, { scope: sectionRef })

    return (
        <section ref={sectionRef} className={styles.portfolioSection}>
            <div className={styles.header}>
                <div className={styles.titleWrapper}>
                    <h2 className={styles.title}>Featured Work</h2>
                    <span className={styles.downArrow}><MoveDown size={40} strokeWidth={1.5} /></span>
                </div>
                <a href="#" className={styles.allWorkLink}>
                    <RollingText text="ALL WORK" /> <ArrowRight size={14} />
                </a>
            </div>

            <div ref={scrollContainerRef} className={styles.scrollContainer}>
                <div ref={cardsRef} className={styles.cardsWrapper}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={styles.card}
                            style={{ backgroundColor: cardBackgrounds[index % cardBackgrounds.length] }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                        >
                            <div className={styles.imageContainer}>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className={styles.image}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>

                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>
                                    <RollingText text={project.title} />
                                </h3>
                                <div className={styles.tags}>
                                    {project.tags.map((tag) => (
                                        <span key={tag} className={styles.tag}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
