"use client"

import { useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import styles from "./home-expertise.module.css"
import Image from "next/image"
import { BarChart } from "./BarChart"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const AIStrategySlide = () => (
    <div className={styles.slideCard}>
        <div className={styles.slideHeader}>
            <h4 className={styles.slideTitle}>AI Strategy Consulting</h4>
            <p className={styles.slideSub}>We help you implement AI solutions for maximum efficiency and growth.</p>
        </div>
        <div className={styles.mockUiContainer}>
            <div className={styles.chartWrapper}>
                <BarChart />
            </div>
        </div>
    </div>
)

const creditData = [
    {
        company: "Avancera Solution",
        year: "Nov 2024 - Present",
        role: "AI Architect & Automation",
        location: "Global",
        description: [
            "AI Workflow Design: Designing and deploying scalable AI workflows and automation pipelines to optimize business operations.",
            "Prompt Engineering: Implementing advanced prompt engineering strategies to maximize the quality and accuracy of LLM (Large Language Model) outputs.",
            "Custom Automation: Architecting bespoke automation solutions and CRM integrations (GoHighLevel) to streamline lead generation and client management.",
            "Next-Gen Development: Developing high-performance custom websites using Next.js, React.js, and TypeScript, moving beyond standard CMS limitations.",
            "Generative Media: Utilizing AI tools to generate consistent, high-fidelity brand images and videos, integrating them seamlessly into digital platforms.",
            "Full-Stack Management: Overseeing complex ecosystems involving various CMS platforms and custom codebases to reduce page load times and improve SEO."
        ],
        growthDescription: "Since joining the team, I focused on shifting our strategy from manual execution to AI-driven scaling. By October, we established the initial automation pipelines. As the prompt engineering strategies were refined through December and January, we saw a massive surge in efficiency and output. By March, our automated workflows reached a peak of 5.9k units, representing a nearly 6x increase in performance compared to our starting baseline. This growth was driven by a synergy of custom Next.js architecture and optimized AI agents."
    },
    {
        company: "WeCreative",
        year: "Nov 2023 - Nov 2024",
        role: "Website Developer",
        location: "Remote",
        description: [
            "Design Figma prototypes & build custom WordPress websites using Elementor, Bricks, & WPBakery builders.",
            "Advanced to leading end-to-end builds, from Figma prototypes to custom WordPress/Shopify solutions.",
            "Launched 43+ WordPress/Shopify sites; average client satisfaction 4.8/5; reduced dev cycles by 20%."
        ]
    },
    {
        company: "Growth Modo",
        year: "May 2020 - Sep 2024",
        role: "Web Developer",
        location: "Remote",
        description: [
            "Converted Figma designs into fully functional WordPress and Shopify websites, delivered 38+ projects.",
            "Achieved an 87% improvement in mobile conversion on client redesigns.",
            "Managed independent client projects, from design to launch, while balancing a full-time role."
        ]
    },
    {
        company: "Apps Alberta",
        year: "Jul 2019 - Nov 2021",
        role: "Front-End Developer",
        location: "Canada",
        description: [
            "Built 20+ WordPress websites; Improved page load speed by 90%, reducing bounce rates by 25%.",
            "Implemented custom themes, plugins, and integrations to enhance website functionality.",
            "Focused on front-end development; later expanded into full-stack tasks including backend optimization."
        ]
    },
]

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
                            {creditData.map((item, i) => {
                                const isOpen = activeIndex === i;
                                return (
                                    <motion.div
                                        layout
                                        key={i}
                                        className={`${styles.accordionRow} ${isOpen ? styles.rowOpen : ""}`}
                                        onClick={() => setActiveIndex(isOpen ? null : i)}
                                    >
                                        <motion.div layout className={styles.colNum}>(00{i + 1})</motion.div>

                                        <motion.div layout className={styles.colMain}>
                                            <AnimatePresence mode="popLayout">
                                                {isOpen ? (
                                                    <motion.div
                                                        key="open"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.3 }}
                                                        className={styles.openLayout}
                                                    >
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
                                                        <div className={styles.textBlock}>
                                                            <h3>{item.company}</h3>
                                                            <p>{item.description[0]}</p>
                                                        </div>
                                                        <div className={styles.categoriesBlock}>
                                                            <span className={styles.catLabel}>Categories</span>
                                                            <div className={styles.pills}>
                                                                <span className={styles.pill}>{item.role}</span>
                                                                <span className={styles.pill}>{item.year}</span>
                                                                <span className={styles.pill}>{item.location}</span>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="closed"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className={styles.closedLayout}
                                                    >
                                                        <h3>{item.company}</h3>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>

                                        <motion.div layout className={styles.colToggle}>
                                            <div className={styles.toggleBtn}>
                                                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
