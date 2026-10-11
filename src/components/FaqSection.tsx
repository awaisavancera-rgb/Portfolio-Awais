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
        question: "What core services do you specialize in?",
        answer: "I deliver end-to-end digital engineering across four key pillars: 1) Creative Frontend & Interactive Web Apps (Next.js, React 19, TypeScript, GSAP), 2) E-Commerce & CMS Architecture (Shopify Liquid, WordPress, WooCommerce), 3) CRM Funnels & Automation (GoHighLevel, HubSpot, Klaviyo, Zapier/Make), and 4) Advanced AI Engineering (Custom RAG architectures, Autonomous Voice Calling Agents & Support Bots)."
    },
    {
        num: "02",
        question: "Which tech stacks and platforms do you build with?",
        answer: "My core frontend stack is Next.js 16 (App Router), React 19, TypeScript, and Vanilla CSS Modules, powered by GSAP, Framer Motion, and Lenis for fluid motion. For e-commerce and CMS, I specialize in Shopify Liquid and WordPress. On the backend and AI side, I work with Python, LangChain, Vector Databases (Pinecone & Qdrant), n8n, OpenAI/Claude APIs, and Vapi/Bland AI for voice systems."
    },
    {
        num: "03",
        question: "Can you build custom AI Voice Agents and automated workflows?",
        answer: "Yes, absolutely. I develop intelligent, conversational AI calling agents (using Vapi, Bland AI, and Twilio telephony) for automated inbound/outbound calls, lead qualification, and appointment booking. I also engineer 24/7 autonomous support bots for WhatsApp, Telegram, and web, wired directly into your CRM (GoHighLevel, HubSpot, Salesforce)."
    },
    {
        num: "04",
        question: "Do you build from scratch or migrate existing websites and stores?",
        answer: "Both. I architect brand-new high-converting stores and custom platforms from scratch, and I also execute seamless migrations—such as moving legacy stores to modern Shopify Liquid, upgrading outdated WordPress sites, or re-platforming to headless Next.js with zero downtime and strict SEO preservation."
    },
    {
        num: "05",
        question: "Can you handle both UI/UX design in Figma and custom development?",
        answer: "Yes, I offer complete end-to-end product delivery. I design clean, intuitive interfaces and design systems directly in Figma, and then translate them 1:1 into accessible, pixel-perfect production code with fluid micro-interactions and smooth responsive layouts."
    },
    {
        num: "06",
        question: "What is your typical project timeline and development process?",
        answer: "A standard custom store or interactive web project typically takes 2 to 4 weeks, while larger enterprise platforms or multi-agent AI ecosystems range from 4 to 8 weeks. Every project follows a transparent 4-stage pipeline: Discovery & Architecture, UI/UX Prototyping in Figma, Full-Stack Development & Testing, and Launch, Speed Optimization & Handover."
    }
];

export function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const leftColumnRef = useRef<HTMLDivElement>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.faqSection}>
            {/* Top Meta Bar */}
            <div className={styles.metaBar}>
                <span>© Help Center</span>
                <span>(MAP® — 03)</span>
                <span>Clarifications</span>
            </div>

            <div className={styles.container} ref={containerRef}>
                {/* Left Column - Sticky Image and Text */}
                <div className={styles.leftColumn} ref={leftColumnRef}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/muhammad-awais-main-banner.png"
                            alt="FAQ Portrait"
                            fill
                            style={{ objectFit: 'cover' }}
                            unoptimized
                        />
                    </div>
                    <h3 className={styles.heading}>
                        Clarifying Deliverables<br />
                        Before We Begin<br />
                        with Real Process &<br />
                        Full Transparency.
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
