"use client";

import styles from "./footer.module.css";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const mainNavLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/work" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
];

const legalLinks = [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "404", href: "/404" },
];

const socialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/awais_khan_48", external: true },
    { label: "GitHub", href: "https://github.com/awaisarain-marker", external: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammadawais-webdev/", external: true },
    { label: "Fiverr", href: "https://www.fiverr.com/awaislancer48", external: true },
];

interface WaveNavLinkProps {
    href: string;
    label: string;
    isDimmed: boolean;
    onMouseEnter: () => void;
    external?: boolean;
}

function WaveText({ text, stepDelay = 25 }: { text: string; stepDelay?: number }) {
    return (
        <span className={styles.waveText} aria-hidden="true">
            <span className={styles.waveRow}>
                {text.split("").map((char, charIdx) => (
                    <span
                        key={charIdx}
                        className={styles.waveChar}
                        style={{ transitionDelay: `${charIdx * stepDelay}ms` }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </span>
            <span className={`${styles.waveRow} ${styles.waveRowDuplicate}`}>
                {text.split("").map((char, charIdx) => (
                    <span
                        key={charIdx}
                        className={styles.waveChar}
                        style={{ transitionDelay: `${charIdx * stepDelay}ms` }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </span>
        </span>
    );
}

function WaveNavLink({ href, label, isDimmed, onMouseEnter, external }: WaveNavLinkProps) {
    return (
        <Link
            href={href}
            className={`${styles.mainNavLink} ${isDimmed ? styles.dimmedLink : ""}`}
            onMouseEnter={onMouseEnter}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
            <span className={styles.srOnly}>{label}</span>
            <WaveText text={label} stepDelay={25} />
        </Link>
    );
}

export function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [hoveredNav, setHoveredNav] = useState<{ col: number; index: number } | null>(null);
    const [hoveredContact, setHoveredContact] = useState<"email" | "phone" | null>(null);

    const handleNewsletter = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setTimeout(() => {
                setSubscribed(false);
                setEmail("");
            }, 3000);
        }
    };

    return (
        <footer className={styles.footerWrapper}>
            <div className={styles.footerContent}>
                {/* Top Section from Reference */}
                <div className={styles.referenceTopSection}>
                    {/* Top Bar */}
                    <div className={styles.topBar}>
                        <span>Independent</span>
                        <span>Overview</span>
                        <span>Multidisciplinary</span>
                        <span>Focused</span>
                    </div>

                    <div className={styles.referenceContent}>
                        <p className={styles.referenceText}>
                            I build expressive, performance-driven websites by blending clean design and native development inside Framer to help creative teams and modern brands stand out with intention.
                        </p>
                        <a href="mailto:awaisarain953@gmail.com" className="primary-btn">
                            <span className="btnText">EMAIL ME</span>
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
                        </a>
                    </div>
                </div>

                {/* Top: Mega Title */}
                <div className={styles.titleWrapper}>
                    <h1 className={styles.megaTitle}>
                        Muhammad Awais
                    </h1>
                </div>

                {/* Middle: Info and Newsletter */}
                <div className={styles.middleWrapper}>
                    <div className={styles.contactInfo}>
                        <p className={styles.description}>
                            Whether you&apos;re building a brand, designing a product, or
                            simply want to explore an idea, <span className={styles.descriptionHighlight}>I&apos;d love to hear from you.</span>
                        </p>
                        <div 
                            className={styles.directContact}
                            onMouseLeave={() => setHoveredContact(null)}
                        >
                            <a 
                                href="mailto:awaisarain953@gmail.com" 
                                className={`${styles.directContactLink} ${styles.emailLink} ${hoveredContact === "phone" ? styles.dimmedLink : ""}`}
                                onMouseEnter={() => setHoveredContact("email")}
                            >
                                <span className={styles.srOnly}>awaisarain953@gmail.com</span>
                                <WaveText text="awaisarain953@gmail.com" stepDelay={16} />
                            </a>
                            <a 
                                href="tel:+923103751421" 
                                className={`${styles.directContactLink} ${styles.phoneText} ${hoveredContact === "email" ? styles.dimmedLink : ""}`}
                                onMouseEnter={() => setHoveredContact("phone")}
                            >
                                <span className={styles.srOnly}>+92 310 3751421</span>
                                <WaveText text="+92 310 3751421" stepDelay={20} />
                            </a>
                        </div>
                    </div>

                    <div className={styles.newsletterWrapper}>
                        <span className={styles.newsletterTitle}>Get updates and insights &mdash; Sign up for monthly newsletter.</span>
                        <form className={styles.newsletterForm} onSubmit={handleNewsletter}>
                            <div className={styles.newsletterInputGroup}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className={styles.newsletterInput}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button type="submit" className="primary-btn">
                                    <span className="btnText">{subscribed ? "SUBSCRIBED!" : "SIGN UP"}</span>
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
                                </button>
                            </div>
                            {subscribed && (
                                <span className={styles.newsletterSuccess}>Thank you for subscribing!</span>
                            )}
                        </form>
                    </div>
                </div>

                {/* Bottom: Nav Columns */}
                <div className={styles.bottomWrapper}>
                    {/* Column 1: Main Pages */}
                    <div 
                        className={`${styles.linksColumn} ${styles.mainNavColumn}`}
                        onMouseLeave={() => setHoveredNav(null)}
                    >
                        {mainNavLinks.map((item, index) => (
                            <WaveNavLink
                                key={item.href}
                                href={item.href}
                                label={item.label}
                                isDimmed={hoveredNav !== null && hoveredNav.col === 0 && hoveredNav.index !== index}
                                onMouseEnter={() => setHoveredNav({ col: 0, index })}
                            />
                        ))}
                    </div>

                    {/* Column 2: Legal / Terms */}
                    <div 
                        className={`${styles.linksColumn} ${styles.mainNavColumn}`}
                        onMouseLeave={() => setHoveredNav(null)}
                    >
                        {legalLinks.map((item, index) => (
                            <WaveNavLink
                                key={item.href}
                                href={item.href}
                                label={item.label}
                                isDimmed={hoveredNav !== null && hoveredNav.col === 1 && hoveredNav.index !== index}
                                onMouseEnter={() => setHoveredNav({ col: 1, index })}
                            />
                        ))}
                    </div>

                    {/* Column 3: Social Media */}
                    <div 
                        className={`${styles.linksColumn} ${styles.mainNavColumn}`}
                        onMouseLeave={() => setHoveredNav(null)}
                    >
                        {socialLinks.map((item, index) => (
                            <WaveNavLink
                                key={item.href}
                                href={item.href}
                                label={item.label}
                                isDimmed={hoveredNav !== null && hoveredNav.col === 2 && hoveredNav.index !== index}
                                onMouseEnter={() => setHoveredNav({ col: 2, index })}
                                external={item.external}
                            />
                        ))}
                    </div>

                    {/* Column 4: Rights & Attribution */}
                    <div className={styles.linksColumn} style={{ alignItems: "flex-end" }}>
                        <span className={styles.legalText}>Designed by <span className={styles.legalWhite}>Awais</span></span>
                        <span className={styles.legalText}>© 2026 All rights reserved</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}
