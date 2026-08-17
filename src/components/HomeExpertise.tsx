"use client"

import { useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import styles from "./home-expertise.module.css"
import Image from "next/image"
import { motion } from "framer-motion"
import { Plus, Minus } from "lucide-react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "(001)",
    title: "CMS, E-Commerce & CRM Architecture",
    description: "Building high-converting Shopify Liquid stores, custom WordPress/WooCommerce solutions, and GoHighLevel CRM automation funnels optimized for speed and maximum conversions.",
    tags: ["Shopify Liquid", "WordPress", "GoHighLevel", "Speed Optimization"]
  },
  {
    id: "(002)",
    title: "Creative Frontend & Interactive UI",
    description: "Designing animated components in Figma and building high-performance Next.js and TypeScript web applications using GSAP and Framer Motion for smooth micro-interactions.",
    tags: ["Next.js", "GSAP / Framer Motion", "TypeScript", "Figma Design"]
  },
  {
    id: "(003)",
    title: "Advanced AI Engineering & RAG Architecture",
    description: "Architecting custom RAG systems, Knowledge Graphs, and Graph Engineering workflows to bridge enterprise data with LLMs, integrated with n8n and CRM automation pipelines.",
    tags: ["RAG Architecture", "Graph Engineering", "n8n Automation", "Vector DBs"]
  },
  {
    id: "(004)",
    title: "Autonomous AI Agents & Voice Systems",
    description: "Developing intelligent AI calling agents, autonomous 24/7 customer support bots, social media managers, and multi-agent workflows engineered with self-correcting execution loops.",
    tags: ["AI Voice Agents", "Support Agents", "Social Media Bots", "Loop Engineering"]
  }
];

export const HomeExpertise = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const tableRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState<number | null>(0)

    useGSAP(() => {
        if (!sectionRef.current || !titleRef.current || !tableRef.current || !imageRef.current) return

        // 1. Title Reveal
        gsap.fromTo(titleRef.current,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            }
        )

        // 2. Image Reveal
        gsap.fromTo(imageRef.current,
            { scale: 0.8, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                }
            }
        )

        // 3. Table Rows Stagger
        const rows = tableRef.current.children
        gsap.fromTo(rows,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: tableRef.current,
                    start: "top 85%",
                }
            }
        )

        // 4. Dynamic Pinning (Stacking Card Effect)
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: () => sectionRef.current && sectionRef.current.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
            pin: true,
            pinSpacing: false
        });

    }, { scope: sectionRef })

    return (
        <>
            <section ref={sectionRef} className={styles.expertiseSection}>

                {/* 1. Top Bar */}
                <div className={styles.topBar}>
                    <span className={styles.topBarLeft}>© EXPERIENCE</span>
                    <span className={styles.topBarCenter}>(WDX® — 05)</span>
                    <span className={styles.topBarRight}>DIGITAL CRAFT</span>
                </div>

                <div className={styles.container}>
                    {/* 2. Hero Area: Title + Image */}
                    <div className={styles.heroArea}>
                        <h2 ref={titleRef} className={styles.craftTitle}>
                            <span className={styles.smallTxt}>Muhammad</span><br />
                            Awais Profile
                        </h2>
                        <div ref={imageRef} className={styles.heroImageWrapper}>
                            <div className={styles.mockupBg}>
                                <Image
                                    src="/mockup-laptop-3.png"
                                    alt="Craft Image"
                                    fill
                                    className={styles.heroImage}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 3. Data Table (Accordion) */}
                    <div className={styles.tableContainer}>
                        {/* Headers (Service Related) */}
                        <div className={styles.tableHeader}>
                            <span className={styles.headerNum}>Index</span>
                            <span className={styles.headerMain}>Service</span>
                            <span className={styles.headerToggle}>Explore</span>
                        </div>

                        {/* Rows */}
                        <div ref={tableRef} className={styles.rowsWrapper}>
                            {servicesData.map((item, i) => {
                                const isOpen = activeIndex === i;
                                return (
                                    <div
                                        key={item.id}
                                        className={`${styles.accordionRow} ${isOpen ? styles.rowOpen : ""}`}
                                        onClick={() => setActiveIndex(isOpen ? null : i)}
                                    >
                                        <div className={styles.colNum}>{item.id}</div>

                                        <div className={styles.colContent}>
                                            {!isOpen && (
                                                <div className={styles.closedLayout}>
                                                    <h3 className={styles.closedTitle}>{item.title}</h3>
                                                </div>
                                            )}

                                            <motion.div
                                                initial={false}
                                                animate={{
                                                    height: isOpen ? "auto" : 0,
                                                    opacity: isOpen ? 1 : 0
                                                }}
                                                transition={{
                                                    height: {
                                                        duration: 0.55,
                                                        ease: [0.16, 1, 0.3, 1]
                                                    },
                                                    opacity: {
                                                        duration: isOpen ? 0.35 : 0.2,
                                                        delay: isOpen ? 0.08 : 0,
                                                        ease: "easeInOut"
                                                    }
                                                }}
                                                className={styles.expandedWrapper}
                                            >
                                                <div className={styles.expandedInner}>
                                                    <div className={styles.leftGroup}>
                                                        <div className={styles.imagesStack}>
                                                            <div className={styles.imageLayer1}>
                                                                <Image src="/mockup-laptop-3.png" alt="thumbnail 1" fill style={{ objectFit: 'cover' }} />
                                                            </div>
                                                            <div className={styles.imageLayer2}>
                                                                <Image src="/mockup-laptop-3.png" alt="thumbnail 2" fill style={{ objectFit: 'cover' }} />
                                                            </div>
                                                            <div className={styles.imageLayer3}>
                                                                <Image src="/mockup-laptop-3.png" alt="thumbnail 3" fill style={{ objectFit: 'cover' }} />
                                                            </div>
                                                        </div>

                                                        <div className={styles.serviceInfo}>
                                                            <h3 className={styles.expandedTitle}>{item.title}</h3>
                                                            <p className={styles.expandedDesc}>{item.description}</p>
                                                        </div>
                                                    </div>

                                                    <div className={styles.categoriesBlock}>
                                                        <p className={styles.catLabel}>Categories</p>
                                                        <div className={styles.pills}>
                                                            {item.tags.map((tag, tIdx) => (
                                                                <div key={tIdx} className={styles.pill}>
                                                                    <span>{tag}</span>
                                                                </div>
                                                            ))}
                                                            <div className={styles.pillCount}>
                                                                <span>{item.tags.length}+</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>

                                        <div className={styles.colToggle}>
                                            <div className={styles.toggleBtn}>
                                                <div
                                                    className={styles.buttonInner}
                                                    style={{ transform: isOpen ? "rotate(270deg)" : "rotate(0deg)" }}
                                                >
                                                    <div className={styles.iconCross}>
                                                        <span className={styles.barH} />
                                                        <span
                                                            className={styles.barV}
                                                            style={{
                                                                transform: isOpen ? "scaleY(0)" : "scaleY(1)",
                                                                opacity: isOpen ? 0 : 1
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
