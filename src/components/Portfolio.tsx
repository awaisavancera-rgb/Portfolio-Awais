"use client"

import React, { useRef } from "react"
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
    className: string
    bgClass: string
}

const projects: Project[] = [
    {
        id: 1,
        title: "Lorikeet CX",
        tags: ["Motion & 3D", "Web Development"],
        image: "/mockup-laptop.png",
        className: styles.largeCard,
        bgClass: styles.bgCream,
    },
    {
        id: 2,
        title: "Teak",
        tags: ["Motion & 3D", "Web Development"],
        image: "/mockup-phone.png",
        className: styles.smallCard,
        bgClass: styles.bgSoftTan,
    },
    {
        id: 3,
        title: "We Scale It",
        tags: ["Brand Identity", "Web Design & Development"],
        image: "/mockup-watch.png",
        className: styles.fullWidthCard,
        bgClass: styles.bgDark,
    },
    {
        id: 4,
        title: "Kastle AI",
        tags: ["Motion & 3D", "Web Design & Development"],
        image: "/mockup-display.png",
        className: styles.smallGridCard,
        bgClass: styles.bgLightPink,
    },
    {
        id: 5,
        title: "Jeremie Bouchard | Director + Editor",
        tags: ["Brand Identity", "Web Design & Development"],
        image: "/mockup-laptop-2.png",
        className: styles.smallGridCard,
        bgClass: styles.bgDeepRed,
    },
    {
        id: 6,
        title: "Kimu - Agence Créative",
        tags: ["Web Design & Development"],
        image: "/mockup-laptop-3.png",
        className: styles.smallGridCard,
        bgClass: styles.bgSoftGreen,
    },
]

export const Portfolio = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!scrollContainerRef.current || !cardsRef.current) return

        const cards = cardsRef.current.children
        const totalWidth = cardsRef.current.scrollWidth
        const containerWidth = scrollContainerRef.current.offsetWidth

        // Create horizontal scroll animation
        const scrollTween = gsap.to(cardsRef.current, {
            x: -(totalWidth - containerWidth),
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
                            className={`${styles.card} ${project.className} ${project.bgClass}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                        >
                            <div className={styles.mockupWrapper}>
                                <div className={styles.mockup}>
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className={styles.image}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                            </div>

                            <div className={styles.cardFooter}>
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
