"use client"

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import styles from "./workDetail.module.css";
import { Footer } from "@/components/Footer";

export default function WorkDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = use(props.params);
    const project = projects.find(p => p.slug === params.slug);

    if (!project) {
        return (
            <main className={styles.pageContainer} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ fontSize: '2rem' }}>Project not found</h1>
                <Link href="/" style={{ color: '#aaa', textDecoration: 'underline', marginTop: '20px' }}>Return Home</Link>
            </main>
        );
    }

    return (
        <main className={styles.pageContainer}>
            {/* Marquee Header */}
            <div className={styles.marqueeContainer}>
                <div className={styles.marqueeText}>
                    {project.title} / {project.title} / {project.title} / {project.title} /
                </div>
            </div>

            {/* Content Section */}
            <div className={styles.contentContainer}>
                {/* Left Sticky Sidebar */}
                <div className={styles.leftSidebar}>
                    <div className={styles.dateText}>{project.date}</div>
                    
                    <div className={styles.descriptionText}>
                        {project.description}
                    </div>

                    <div className={styles.infoList}>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Category:</span>
                            <span className={styles.infoValue}>{project.tag}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Client:</span>
                            <span className={styles.infoValue}>{project.client}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Duration:</span>
                            <span className={styles.infoValue}>{project.duration}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Location:</span>
                            <span className={styles.infoValue}>{project.location}</span>
                        </div>
                    </div>

                    <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.liveBtn}>
                        Live Website
                    </a>
                </div>

                {/* Right Scrollable Gallery */}
                <div className={styles.rightGallery}>
                    {project.gallery?.map((imgUrl: string, idx: number) => (
                        <Image 
                            key={idx}
                            src={imgUrl}
                            alt={`${project.title} image ${idx + 1}`}
                            width={1200}
                            height={800}
                            unoptimized
                            className={styles.galleryImage}
                        />
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
