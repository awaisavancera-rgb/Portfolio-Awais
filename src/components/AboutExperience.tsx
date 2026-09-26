"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./aboutExperience.module.css";

interface ExperienceItem {
    company: string;
    period: string;
    role: string;
    location: string;
}

const experienceList: ExperienceItem[] = [
    {
        company: "Clavmen Studio",
        period: "2022 - present",
        role: "Art Director & Designer",
        location: "Tokyo",
    },
    {
        company: "Modular Eight",
        period: "2020 – 2022",
        role: "Senior Developer",
        location: "Osaka",
    },
    {
        company: "Haus of Signal",
        period: "2018 – 2020",
        role: "Creative Technologist",
        location: "Berlin",
    },
    {
        company: "Studio Orbit",
        period: "2016 – 2018",
        role: "UI/UX Designer",
        location: "Dallas",
    },
    {
        company: "Novaform Labs",
        period: "2014 – 2016",
        role: "Junior Designer",
        location: "Kyoto",
    },
];

export function AboutExperience() {
    return (
        <section className={styles.experienceSection} aria-label="Experience">
            <div className={styles.container}>
                {/* 1. Meta Bar (100% consistent with AboutBio) */}
                <div className={styles.metaBar}>
                    <span>© EXPERIENCE エクスペリエンス</span>
                    <span>(WDX® — 05)</span>
                    <span>DIGITAL CRAFT</span>
                </div>

                {/* 2. Headline & Portrait Card (Without signature) */}
                <div className={styles.headingWrapper}>
                    <motion.h2
                        className={styles.headingText}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Practice.
                    </motion.h2>

                    <motion.div
                        className={styles.imageCardWrapper}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Image
                            src="/about/practice-image.jpg"
                            alt="Practice & Craft"
                            fill
                            sizes="(max-width: 768px) 100px, 140px"
                            className={styles.cardImage}
                            priority={false}
                        />
                    </motion.div>
                </div>

                {/* 3. White Category Strip */}
                <div className={styles.whiteStripContainer}>
                    <div className={styles.whiteStripInner}>
                        <div className={styles.stripCol}>
                            <span className={styles.stripText}>Global</span>
                        </div>
                        <div className={styles.stripCol}>
                            <span className={styles.stripText}>Creative Collabs</span>
                        </div>
                        <div className={styles.stripCol}>
                            <span className={styles.stripText}>Studio</span>
                        </div>
                        <div className={styles.stripCol}>
                            <span className={styles.stripText}>Creative Partnerships</span>
                        </div>
                    </div>
                </div>

                {/* 4. Experience Table (5 Rows) */}
                <div className={styles.tableContainer}>
                    {experienceList.map((item, index) => (
                        <motion.div
                            key={index}
                            className={styles.tableRow}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                        >
                            <div className={styles.companyCol}>{item.company}</div>
                            <div className={styles.periodCol}>{item.period}</div>
                            <div className={styles.roleCol}>{item.role}</div>
                            <div className={styles.locationCol}>{item.location}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
