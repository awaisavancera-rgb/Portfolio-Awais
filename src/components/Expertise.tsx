"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import styles from "./expertise.module.css"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { BarChart } from "./BarChart"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const ChatbotSlide = () => (
    <div className={styles.slideCard}>
        <div className={styles.slideHeader}>
            <h4 className={styles.slideTitle}>Chatbot Development</h4>
            <p className={styles.slideSub}>We build custom AI chat solutions for instant support and sales.</p>
        </div>
        <div className={styles.mockUiContainer}>
            <div className={styles.chatbotHeader}>
                <div className={styles.gptPill}>
                    <svg viewBox="0 0 24 24" className={styles.pillIcon} fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                    <span>GPT 5.2</span>
                    <span className={styles.chevronDown}>▼</span>
                </div>
            </div>
            <div className={styles.chatMain}>
                <span className={styles.chatText}>Smart cha</span>
            </div>
            <div className={styles.chatbotFooter}>
                <div className={styles.footerLeft}>
                    <div className={styles.footerBtn}><svg viewBox="0 0 24 24" width="16" height="16" fill="white"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg></div>
                    <div className={styles.footerBtn}><svg viewBox="0 0 24 24" width="16" height="16" fill="white"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" /></svg></div>
                    <div className={styles.footerBtn}><svg viewBox="0 0 24 24" width="16" height="16" fill="white"><path d="M10 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" /></svg></div>
                </div>
                <div className={styles.footerRight}>
                    <div className={styles.footerBtn}><svg viewBox="0 0 24 24" width="16" height="16" fill="white"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" /></svg></div>
                    <div className={styles.footerBtn}><svg viewBox="0 0 24 24" width="16" height="16" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg></div>
                </div>
            </div>
        </div>
    </div>
)

const VoiceAssistantSlide = () => (
    <div className={styles.slideCard}>
        <div className={styles.slideHeader}>
            <h4 className={styles.slideTitle}>Voice Assistants</h4>
            <p className={styles.slideSub}>We build smart voice solutions for effortless control and better access.</p>
        </div>
        <div className={styles.mockUiContainer}>
            <div className={styles.voiceList}>
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className={styles.voiceItem}>
                        <div className={styles.avatar}>
                            <Image src="/avatar-placeholder.png" alt="User" fill className={styles.heroImage} />
                        </div>
                        <div className={styles.voiceInfo}>
                            <span className={styles.callerName}>Potential Buyer</span>
                            <div className={styles.statusRow}>
                                <div className={styles.statusDot} />
                                <span className={styles.statusText}>INCOMING CALL</span>
                            </div>
                        </div>
                        <div className={styles.micBtnCircle}>
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)

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

export const Expertise = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const tableRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const [currentSlide, setCurrentSlide] = useState(0)
    const slides = [ChatbotSlide, VoiceAssistantSlide, AIStrategySlide]

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

    }, { scope: sectionRef })

    return (
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
                        <div style={{ width: '100%', height: '100%', backgroundColor: '#eee' }}>
                            <Image
                                src="/mockup-laptop-3.png"
                                alt="Craft Image"
                                fill
                                className={styles.heroImage}
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Data Table */}
                <div className={styles.tableContainer}>
                    {/* Headers (Desktop) */}
                    <div className={styles.tableHeader}>
                        <span>Global</span>
                        <span>Year</span>
                        <span>Role</span>
                        <span style={{ textAlign: 'right' }}>Location</span>
                    </div>

                    {/* Rows */}
                    <div ref={tableRef} className={styles.rowsWrapper}>
                        {creditData.map((item, i) => (
                            <div key={i} className={styles.tableItem}>
                                <div className={styles.tableRow}>
                                    <span className={styles.companyName}>{item.company}</span>
                                    <span>{item.year}</span>
                                    <span className={styles.role}>{item.role}</span>
                                    <span className={styles.location}>{item.location}</span>
                                </div>
                                <div className={styles.accordionContent}>
                                    <div className={styles.accordionBody}>
                                        <div className={styles.textSide}>
                                            <p className={styles.highlightText}>{item.description[0]}</p>
                                            {item.growthDescription && (
                                                <p className={styles.growthText} style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
                                                    {item.growthDescription}
                                                </p>
                                            )}
                                            <ul className={styles.descriptionList}>
                                                {item.description.slice(1).map((point, index) => (
                                                    <li key={index}>{point}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className={styles.chartSide}>
                                            {item.growthDescription && (
                                                <div className={styles.growthNarrative}>
                                                    <h5 className={styles.growthTitle}>The Impact of Intelligent Automation</h5>
                                                    <p className={styles.growthText}>{item.growthDescription}</p>
                                                </div>
                                            )}
                                            <div className={styles.carouselContainer}>
                                                <motion.div
                                                    className={styles.carouselTrack}
                                                    animate={{ x: `calc(-${currentSlide * 46.5}vw)` }}
                                                    transition={{ type: "spring", damping: 25, stiffness: 120 }}
                                                >
                                                    {slides.map((Slide, idx) => (
                                                        <Slide key={idx} />
                                                    ))}
                                                </motion.div>
                                            </div>
                                            <div className={styles.sliderNav}>
                                                {slides.map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }}
                                                        className={`${styles.navDot} ${currentSlide === idx ? styles.activeDot : ''}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
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
