"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './faqSection.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const faqs = [
    {
        num: "01",
        question: "What services do you offer?",
        answer: "I provide creative direction, branding, UI/UX design, and Framer development tailored for modern digital experiences."
    },
    {
        num: "02",
        question: "What is your typical turnaround time?",
        answer: "Typically, a standard project takes 2-4 weeks. However, turnaround times depend entirely on the scope and complexity of the work."
    },
    {
        num: "03",
        question: "Do you only work in Framer?",
        answer: "While Framer is my primary tool for web development due to its animation capabilities, I also work with Next.js, React, and other modern stacks when required."
    },
    {
        num: "04",
        question: "Can you handle both design and build?",
        answer: "Yes, I offer end-to-end services. I can take your project from the initial strategy and wireframing phase all the way to a fully developed, live product."
    },
    {
        num: "05",
        question: "Do you offer brand strategy too?",
        answer: "Absolutely. A strong design needs a strong foundation. I help define your brand voice, positioning, and visual identity before we start building."
    },
    {
        num: "06",
        question: "What’s your process like?",
        answer: "My process involves Discovery (understanding your goals), Strategy (planning the approach), Design (creating visuals), and Development (building the final product)."
    }
];

export function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const leftColumnRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !leftColumnRef.current) return;
        
        gsap.to(leftColumnRef.current, {
            y: () => containerRef.current!.offsetHeight - leftColumnRef.current!.offsetHeight - 100, // 100 is padding/margin adjustments
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top+=130", // Matches top: 130px
                end: "bottom bottom", 
                scrub: true,
                invalidateOnRefresh: true, // Recalculate on resize
            }
        });
    }, { scope: containerRef });

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.faqSection}>
            {/* Top Meta Bar */}
            <div className={styles.metaBar}>
                <span>© Help Center ヘルプ</span>
                <span>(WDX® — 01)</span>
                <span>Clarifications</span>
            </div>

            <div className={styles.container} ref={containerRef}>
                {/* Left Column - Sticky Image and Text */}
                <div className={styles.leftColumn} ref={leftColumnRef}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="https://framerusercontent.com/images/8Hyh6pB3pbhNuDNsxVZH0w3kvKo.png"
                            alt="FAQ Portrait"
                            fill
                            style={{ objectFit: 'cover' }}
                            unoptimized
                        />
                    </div>
                    <h3 className={styles.heading}>
                        Clarifying Deliverable's<br />
                        Before They Begin<br />
                        with Real Process and<br />
                        Honest.
                    </h3>
                </div>

                {/* Right Column - Accordion */}
                <div className={styles.rightColumn}>
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={faq.num}
                                className={styles.faqItem}
                                onClick={() => toggleFaq(index)}
                            >
                                <div className={styles.faqHeader}>
                                    <span className={styles.faqNum}>{faq.num}</span>
                                    <span className={styles.faqQuestion}>{faq.question}</span>
                                    <div className={styles.iconWrapper}>
                                        <motion.div
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            {isOpen ? (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            ) : (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                        </motion.div>
                                    </div>
                                </div>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                            className={styles.faqAnswerWrapper}
                                        >
                                            <p className={styles.faqAnswer}>{faq.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
