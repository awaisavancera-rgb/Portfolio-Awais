"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, MoveDown } from "lucide-react"
import styles from "./portfolio.module.css"
import { RollingText } from "./RollingText"

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
        image: "/mockup-laptop.png", // We'll need to use placeholders if not present
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
    return (
        <section className={styles.portfolioSection}>
            <div className={styles.header}>
                <div className={styles.titleWrapper}>
                    <h2 className={styles.title}>Featured Work</h2>
                    <span className={styles.downArrow}><MoveDown size={40} strokeWidth={1.5} /></span>
                </div>
                <a href="#" className={styles.allWorkLink}>
                    <RollingText text="ALL WORK" /> <ArrowRight size={14} />
                </a>
            </div>

            <div className={styles.grid}>
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
        </section>
    )
}
