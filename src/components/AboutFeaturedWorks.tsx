"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import styles from "./aboutFeaturedWorks.module.css";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CardItemProps {
    project: typeof projects[0];
}

function FeaturedCardItem({ project }: CardItemProps) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse spring physics for cursor "VIEW" pill
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { stiffness: 450, damping: 40 };
    const mouseXSpring = useSpring(mouseX, springConfig);
    const mouseYSpring = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <div className={styles.cardItem}>
            <Link
                ref={cardRef}
                href={`/work/${project.slug}`}
                className={styles.projectCard}
                data-cursor="none"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className={styles.imageContainer}>
                    {/* Background Mockup Layer */}
                    <div className={styles.bgImageWrapper}>
                        <Image
                            src={project.bgImage}
                            alt={`${project.title} background`}
                            fill
                            style={{ objectFit: "cover" }}
                            unoptimized
                        />
                    </div>

                    {/* Centered Inner Scaling Mockup */}
                    <div className={styles.innerImageWrapper}>
                        <Image
                            src={project.innerImage}
                            alt={`${project.title} mockup`}
                            fill
                            style={{ objectFit: "cover" }}
                            unoptimized
                        />
                    </div>

                    {/* Expanding Hover Tag Banner */}
                    <div className={styles.hoverBanner}>
                        <span className={styles.bannerTag}>{project.tag}</span>
                    </div>

                    {/* Floating Follow-Cursor VIEW Pill */}
                    <motion.div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            x: mouseXSpring,
                            y: mouseYSpring,
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1 : 0.6,
                            pointerEvents: "none",
                            zIndex: 10,
                        }}
                    >
                        <div className={styles.floatingViewBtn}>VIEW</div>
                    </motion.div>
                </div>

                {/* Bottom Roll Title & Count */}
                <div className={styles.bottomInfo}>
                    <div className={styles.textRollWrapper}>
                        <span className={styles.projectTitle}>{project.title}</span>
                        <span className={styles.projectTitleHover}>{project.title}</span>
                    </div>
                    <div className={styles.textRollWrapper}>
                        <span className={styles.projectCount}>({project.id})</span>
                        <span className={styles.projectCountHover}>({project.id})</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export function AboutFeaturedWorks() {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    // Select first 6 high-impact client projects
    const featuredList = projects.slice(0, 6);

    useGSAP(() => {
        if (!sectionRef.current || !triggerRef.current || !trackRef.current) return;

        const mm = gsap.matchMedia();

        // Desktop (> 1024px): Pinned 2-by-2 horizontal sliding showcase
        mm.add("(min-width: 1025px)", () => {
            const track = trackRef.current;
            if (!track) return;

            const totalWidth = track.scrollWidth;
            const viewportWidth = triggerRef.current?.offsetWidth || 1480;
            const scrollDistance = totalWidth - viewportWidth;

            if (scrollDistance > 0) {
                gsap.to(track, {
                    x: -scrollDistance,
                    ease: "none",
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top 12%",
                        end: () => `+=${scrollDistance * 1.5}`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });
            }
        });

        return () => mm.revert();
    }, { scope: sectionRef });

    const marqueeRepeats = [
        "Featured Works©",
        "Featured Works©",
        "Featured Works©",
        "Featured Works©",
        "Featured Works©",
        "Featured Works©"
    ];

    return (
        <section ref={sectionRef} className={styles.featuredWorksSection}>
            {/* 1. Meta Bar */}
            <div className={styles.metaBar}>
                <div className={styles.metaLeft}>
                    <span className={styles.metaLeftTitle}>© Featured Projects プロジェクト</span>
                    <span className={styles.metaLeftCode}>(WDX® — 03)</span>
                </div>
                <div className={styles.metaRight}>
                    <span>Creative Development</span>
                </div>
            </div>

            {/* 2. White Marquee Header Banner */}
            <div className={styles.marqueeWrapper}>
                <div className={styles.marqueeTrack}>
                    {marqueeRepeats.concat(marqueeRepeats).map((text, idx) => (
                        <span key={idx} className={styles.marqueeItem}>
                            {text}
                        </span>
                    ))}
                </div>
            </div>

            <div className={styles.dividerLine} />

            {/* 3. Body Text & Global Styled CTA Button */}
            <div className={styles.bodyRow}>
                <p className={styles.bodyText}>
                    Every project is a chance to blend design and development, shaping bold interactive ideas into{" "}
                    <strong>sleek digital realities — built with</strong> intent, speed, and visual clarity that attracts lot of peoples.
                </p>
                <div className={styles.ctaWrapper}>
                    <Link href="/work" className="primary-btn">
                        <span className="btnText">SEE WORKS</span>
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

            {/* 4. Slider: 2 Cards Visible at Once, Scroll to Reveal Next 2 */}
            <div ref={triggerRef} className={styles.sliderViewport}>
                <div ref={trackRef} className={styles.cardsTrack}>
                    {featuredList.map((project) => (
                        <FeaturedCardItem key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
