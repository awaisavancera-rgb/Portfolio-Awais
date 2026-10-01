"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./reviews.module.css";
import { BadgeCheck, ArrowUpRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { RollingText } from "./RollingText";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Reviews() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const marqueeRevealRef = useRef<HTMLDivElement>(null);
    const marqueeScrollRef = useRef<HTMLDivElement>(null);
    const cardsLayoutRef = useRef<HTMLDivElement>(null);

    const testimonials = [
        {
            id: 1,
            quote: `"Muhammed did an excellent job, working flexibly, suggesting the most efficient solutions and accommodating our work schedules. I highly recommend him, especially to clients who know what they want to achieve with their website but have no internal skills to create it."`,
            name: "Alison Kibble",
            title: "Co-Founder, Kibble Ferrier Consulting",
            image: "/Alison-Portrait.png",
            companyText: "Kibble Ferrier",
            marginOffset: "0vh"
        },
        {
            id: 2,
            quote: `"Muhammed did an excellent job, working flexibly, suggesting the most efficient solutions and accommodating our work schedules. I highly recommend him, especially to clients who know what they want to achieve with their website but have no internal skills to create it."`,
            name: "David Protaziuk",
            title: "Co-Founder, Veteran Medical Opinions",
            image: "/David Protaziuk.png",
            companyText: "Veteran Medical",
            marginOffset: "15vh"
        },
        {
            id: 3,
            quote: `"Professional work and exactly what I wanted for the website design. Muhammed delivered clean aesthetics, responsive structure, and sharp attention to detail that truly brought VitaNova Clinical's vision to life."`,
            name: "Arusvid",
            title: "Founder, VitaNova Clinical",
            image: null,
            initial: "A",
            companyText: "VitaNova",
            marginOffset: "0vh"
        },
        {
            id: 4,
            quote: `"Currently collaborating with Muhammed on our GoHighLevel infrastructure — building out the new website, smart list segmentations, and automated CRM pipelines. His technical grasp of GHL, speed, and proactive communication have made the entire rollout effortless."`,
            name: "Victor",
            title: "Technical Team, Shee & Hawe",
            image: null,
            initial: "V",
            companyText: "Shee & Hawe",
            marginOffset: "0vh"
        },
        {
            id: 5,
            quote: `"Muhammed is leading the frontend engineering for our Next.js medical platform — encompassing client and patient portals with secure HL7/FHIR data workflows, followed by cross-platform mobile development. His architectural discipline and execution standards are exceptional."`,
            name: "Ramez",
            title: "Business Operations Manager, CrestView Group LLC",
            image: null,
            initial: "R",
            companyText: "CrestView Group",
            marginOffset: "20vh"
        }
    ];

    useGSAP(() => {
        // 1. Infinite Horizontal Scroll for the Marquee Text (Paused initially)
        let marqueeTween: gsap.core.Tween | undefined;
        if (marqueeScrollRef.current) {
            const container = marqueeScrollRef.current;
            const textWidth = container.offsetWidth / 2;

            marqueeTween = gsap.to(container, {
                x: -textWidth,
                ease: "none",
                duration: 25,
                repeat: -1,
                paused: true, // Wait for reveal to finish!
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % textWidth)
                }
            });
        }

        if (sectionRef.current) {
            // 2. Reveal Animation for the Huge Text (Like About Us scrub)
            if (marqueeRevealRef.current) {
                gsap.fromTo(marqueeRevealRef.current,
                    { y: "30vh", filter: "blur(20px)", opacity: 0 },
                    {
                        y: "0vh",
                        filter: "blur(0px)",
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 95%", // starts coming in as section enters
                            end: "top 40%",   // completely revealed by the time section pins
                            scrub: 1,
                            onUpdate: (self) => {
                                // If reveal is complete, we slide like marquee!
                                if (self.progress === 1) {
                                    marqueeTween?.play();
                                } else {
                                    marqueeTween?.pause();
                                }
                            }
                        }
                    }
                );
            }

            // 3. ScrollTrigger Pin and Cards Scrub
            if (cardsLayoutRef.current) {
                const contactElem = document.getElementById("contact");

                // Pin the entire 100vh section wrapper (250% on desktop, 200% on mobile)
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: () => (window.innerWidth <= 768 ? "+=200%" : "+=250%"),
                        pin: true,
                        scrub: 1, // Smooth scrub
                        invalidateOnRefresh: true,
                        onToggle: (self) => {
                            if (window.innerWidth <= 768 && contactElem) {
                                if (self.isActive) {
                                    contactElem.style.position = "fixed";
                                    contactElem.style.top = "70vh";
                                    contactElem.style.left = "0";
                                    contactElem.style.width = "100%";
                                    contactElem.style.height = "30vh";
                                    contactElem.style.overflow = "hidden";
                                    contactElem.style.zIndex = "60";
                                } else {
                                    contactElem.style.position = "";
                                    contactElem.style.top = "";
                                    contactElem.style.left = "";
                                    contactElem.style.width = "";
                                    contactElem.style.height = "";
                                    contactElem.style.overflow = "";
                                    contactElem.style.zIndex = "";
                                }
                            }
                        }
                    }
                });

                // Animate the cardsLayout from its initial position upwards over the section
                tl.to(cardsLayoutRef.current, {
                    y: () => {
                        const isMobile = window.innerWidth <= 768;
                        if (isMobile) {
                            return -(cardsLayoutRef.current!.offsetHeight) - (window.innerHeight * 0.15);
                        }
                        // Desktop: Move it up by its own height PLUS an extra 30vh so the last cards sit nicely in the top-middle of screen when pin unhooks
                        return -(cardsLayoutRef.current!.offsetHeight) - (window.innerHeight * 0.3);
                    },
                    ease: "none",
                });
            }
        } // Close if (sectionRef.current)

        return () => {
            const contactElem = document.getElementById("contact");
            if (contactElem) {
                contactElem.style.position = "";
                contactElem.style.top = "";
                contactElem.style.left = "";
                contactElem.style.width = "";
                contactElem.style.height = "";
                contactElem.style.overflow = "";
                contactElem.style.zIndex = "";
            }
        };
    }, { scope: sectionRef });

    const renderCard = (test: any) => (
        <div key={test.id} className={styles.card} style={{ marginTop: test.marginOffset }}>
            <p className={styles.quote}>{test.quote}</p>
            <div className={styles.authorInfo}>
                {test.image ? (
                    <Image
                        src={test.image}
                        alt={test.name}
                        width={48}
                        height={48}
                        className={styles.avatar}
                    />
                ) : (
                    <div className={styles.avatarInitial}>
                        {test.initial || test.name.charAt(0).toUpperCase()}
                    </div>
                )}
                <div className={styles.authorDetails}>
                    <div className={styles.authorNameRow}>
                        <span className={styles.authorName}>{test.name}</span>
                        <BadgeCheck size={14} className={styles.verifiedIcon} />
                    </div>
                    <span className={styles.authorTitle}>{test.title}</span>
                </div>
                <div className={styles.companyFallback}>
                    {test.companyText}
                </div>
            </div>
        </div>
    );

    return (
        <section className={styles.reviewsSection} ref={sectionRef}>
            {/* Background layer inside the pinned GSAP section */}
            <div className={styles.stickyBackground}>

                <div className={styles.headerInfo}>
                    <div className={styles.headerCol}>
                        <span>© TESTIMONIALS レビュー</span>
                    </div>
                    <div className={styles.headerCol} style={{ textAlign: "center" }}>
                        <span>(WDX® — 06)</span>
                    </div>
                    <div className={styles.headerCol} style={{ textAlign: "right" }}>
                        <span>REAL FEEDBACK</span>
                    </div>
                </div>

                <div className={styles.marqueeContainer}>
                    <div ref={marqueeRevealRef}>
                        <div className={styles.marqueeTextContainer} ref={marqueeScrollRef}>
                            <h2 className={styles.marqueeText}>Testimonial© - Reviews Testimonial© - Reviews </h2>
                            <h2 className={styles.marqueeText}>Testimonial© - Reviews Testimonial© - Reviews </h2>
                        </div>
                    </div>
                </div>

                <div className={styles.ctaWrapper}>
                    <Link href="/contact" className="primary-btn light">
                        <span className="btnText">GET IN TOUCH</span>
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
                    </Link>
                </div>

            </div>

            {/* The Cards Layout translates directly UPWARDS over the section on Scroll/Scrub */}
            <div className={styles.cardsLayout} ref={cardsLayoutRef}>

                {/* Row 1: Cards 1 and 2 */}
                <div className={styles.cardRow}>
                    {renderCard(testimonials[0])}
                    {renderCard(testimonials[1])}
                </div>

                {/* Row 2: Card 3 Centered slightly offset */}
                <div className={styles.cardRowCentered}>
                    {renderCard(testimonials[2])}
                </div>

                {/* Row 3: Cards 4 and 5 */}
                <div className={styles.cardRow}>
                    {renderCard(testimonials[3])}
                    {renderCard(testimonials[4])}
                </div>

                {/* Mobile CTA: reveals smoothly after scrolling through all testimonial cards */}
                <div className={styles.mobileCtaWrapper}>
                    <Link href="/contact" className="primary-btn light">
                        <span className="btnText">GET IN TOUCH</span>
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
                    </Link>
                </div>

            </div>
        </section>
    );
}
