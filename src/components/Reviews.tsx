"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./reviews.module.css";
import { BadgeCheck, ArrowUpRight } from "lucide-react";
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
            quote: `"Akihiko elevated every layer of our brand's online presence. From motion details to structural layout, every piece felt crafted and intentional. The site not only looked beautiful but performed well too — and the entire collaboration process was smooth."`,
            name: "Lisa Kuroda",
            title: "Founder, Studio Analog",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
            companyText: "Cairo",
            marginOffset: "0vh"
        },
        {
            id: 2,
            quote: `"Akihiko approaches every project with a deep sense of purpose. His work is never just about the surface — it's about how each element functions, connects, and flows. He brings logic, sharpness, and confidence to every decision, and his build quality."`,
            name: "Daniel Reyes",
            title: "Director, Framehaus",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
            companyText: "Cairo",
            marginOffset: "15vh"
        },
        {
            id: 3,
            quote: `"His clean interaction design is unmatched. Akihiko understands not just how things should look, but why they should look that way — and that insight came through in every part of the work."`,
            name: "Mei Tanaka",
            title: "UX Designer, Nuro",
            image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop",
            companyText: "Cairo",
            marginOffset: "0vh"
        },
        {
            id: 4,
            quote: `"Working with Akihiko was more than just hiring a designer — it felt like bringing on a creative partner who truly understood our goals. He took our raw ideas, added clarity, and transformed them into something that not only looked stunning."`,
            name: "Julian Pierce",
            title: "Director, Vektor Inc.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
            companyText: "Cairo",
            marginOffset: "0vh"
        },
        {
            id: 5,
            quote: `"Akihiko brings a rare balance of creativity and discipline. He's incredibly fast without ever sacrificing attention to detail. From early ideation to the final product, his process is intentional, his communication is clear."`,
            name: "Hana Samoto",
            title: "CEO, Willow Studio",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
            companyText: "Cairo",
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
                // Pin the entire 100vh section wrapper for "250%" of viewport height
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "+=250%",
                        pin: true,
                        scrub: 1, // Smooth scrub
                    }
                });

                // Animate the cardsLayout from its initial top:100vh position 
                // completely upwards over the section
                tl.to(cardsLayoutRef.current, {
                    y: () => {
                        // Move it up by its own height PLUS an extra 30vh so the last cards sit nicely in the top-middle of screen when pin unhooks
                        return -(cardsLayoutRef.current!.offsetHeight) - (window.innerHeight * 0.3);
                    },
                    ease: "none",
                });
            }
        } // Close if (sectionRef.current)
    }, { scope: sectionRef });

    const renderCard = (test: any) => (
        <div key={test.id} className={styles.card} style={{ marginTop: test.marginOffset }}>
            <p className={styles.quote}>{test.quote}</p>
            <div className={styles.authorInfo}>
                <Image
                    src={test.image}
                    alt={test.name}
                    width={48}
                    height={48}
                    className={styles.avatar}
                />
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
                    <motion.button
                        className="btn-talk"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <RollingText text="GET IN TOUCH" />
                        <span className="icon-circle">
                            <ArrowUpRight size={16} />
                        </span>
                    </motion.button>
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

            </div>
        </section>
    );
}
