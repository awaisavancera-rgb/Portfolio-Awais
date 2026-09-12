"use client"

import { use, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/AllWorks";
import styles from "./workDetail.module.css";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export default function WorkDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = use(props.params);
    const project = projects.find(p => p.slug === params.slug);

    const relatedProjects = projects.filter(p => p.id !== project?.id).slice(0, 2);

    useEffect(() => {
        // Add class to html/body to allow native position: sticky on this page
        document.documentElement.classList.add('portfolio-detail-page');
        document.body.classList.add('portfolio-detail-page');

        return () => {
            // Cleanup on unmount
            document.documentElement.classList.remove('portfolio-detail-page');
            document.body.classList.remove('portfolio-detail-page');
        };
    }, []);

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
                <div className={styles.marqueeTrack}>
                    <div className={styles.marqueeText}>
                        {project.title} <span className={styles.separator}>—</span> {project.title} <span className={styles.separator}>—</span> {project.title} <span className={styles.separator}>—</span> {project.title} <span className={styles.separator}>—</span>
                    </div>
                    <div className={styles.marqueeText}>
                        {project.title} <span className={styles.separator}>—</span> {project.title} <span className={styles.separator}>—</span> {project.title} <span className={styles.separator}>—</span> {project.title} <span className={styles.separator}>—</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className={styles.contentContainer}>
                {/* Left Sticky Sidebar */}
                <div className={styles.leftSidebarWrapper}>
                    <div className={styles.leftSidebar}>
                        <div className={styles.dateText}>{project.date}</div>
                    
                    <div className={styles.descriptionText}>
                        {project.description}
                    </div>

                    <div className={styles.infoList}>
                        <div className={styles.infoItemWrapper}>
                            <div className={styles.infoItem}>
                                <div className={styles.infoTexts}>
                                    <span className={styles.infoLabel}>Category:</span>
                                    <span className={styles.infoValue}>{project.tag}</span>
                                </div>
                            </div>
                            <div className={styles.infoLine}></div>
                        </div>
                        <div className={styles.infoItemWrapper}>
                            <div className={styles.infoItem}>
                                <div className={styles.infoTexts}>
                                    <span className={styles.infoLabel}>Client:</span>
                                    <span className={styles.infoValue}>{project.client}</span>
                                </div>
                            </div>
                            <div className={styles.infoLine}></div>
                        </div>
                        <div className={styles.infoItemWrapper}>
                            <div className={styles.infoItem}>
                                <div className={styles.infoTexts}>
                                    <span className={styles.infoLabel}>Duration:</span>
                                    <span className={styles.infoValue}>{project.duration}</span>
                                </div>
                            </div>
                            <div className={styles.infoLine}></div>
                        </div>
                        <div className={styles.infoItemWrapper}>
                            <div className={styles.infoItem}>
                                <div className={styles.infoTexts}>
                                    <span className={styles.infoLabel}>Location:</span>
                                    <span className={styles.infoValue}>{project.location}</span>
                                </div>
                            </div>
                            <div className={styles.infoLine}></div>
                        </div>
                    </div>

                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="primary-btn" style={{ marginTop: '20px' }}>
                            <span className="btnText">LIVE WEBSITE</span>
                            <div className="btnIconCircle">
                                <div className="arrowTrack">
                                    <ArrowRight className="arrowIconPrimary" size={16} />
                                    <ArrowRight className="arrowIconSecondary" size={16} />
                                </div>
                            </div>
                        </a>
                    </div>
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

            {/* More Works Section */}
            <section className={styles.moreWorksSection}>
                <div className={styles.metaBar}>
                    <span>© Curated Interfaces</span>
                    <span>(WDX® — 02)</span>
                    <span>Digital Designer</span>
                </div>

                <div className={styles.marqueeContainer} style={{ paddingTop: '40px', paddingBottom: '40px' }}>
                    <div className={styles.marqueeTrack}>
                        <div className={styles.marqueeText}>
                            More Works© <span className={styles.separator}>—</span> More Works© <span className={styles.separator}>—</span> More Works© <span className={styles.separator}>—</span> More Works© <span className={styles.separator}>—</span>
                        </div>
                        <div className={styles.marqueeText}>
                            More Works© <span className={styles.separator}>—</span> More Works© <span className={styles.separator}>—</span> More Works© <span className={styles.separator}>—</span> More Works© <span className={styles.separator}>—</span>
                        </div>
                    </div>
                </div>

                <div className={styles.relatedGrid}>
                    {relatedProjects.map(p => (
                        <ProjectCard key={p.id} project={p} />
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
