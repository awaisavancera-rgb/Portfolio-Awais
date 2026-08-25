"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './allWorks.module.css';

const projects = [
    {
        id: "01",
        title: "Sonder Goods",
        slug: "sonder-goods",
        tag: "Branding",
        bgImage: "https://framerusercontent.com/images/wA52DtSvQDx894hqLZv4ezfKfz8.png",
        innerImage: "https://framerusercontent.com/images/WSIwyrpSzX4O0fiESBwPTjSWBE.png"
    },
    {
        id: "02",
        title: "Halo Wear",
        slug: "halo-wear",
        tag: "Design",
        bgImage: "https://framerusercontent.com/images/IhwR33YbJAKylGnbmoCW4maBHI.png",
        innerImage: "https://framerusercontent.com/images/tkYEeCoj1udozbnzQynoaYqCI.png"
    },
    {
        id: "03",
        title: "Lucent Lab",
        slug: "lucent-lab",
        tag: "App",
        bgImage: "https://framerusercontent.com/images/G891sPJdh93gPfGSBboEt88Now.png",
        innerImage: "https://framerusercontent.com/images/YIi7jRxIe8p6gLtM1ZMNpJyVYs.jpeg"
    },
    {
        id: "04",
        title: "Arc & Bloom",
        slug: "arc-bloom",
        tag: "UI/UX",
        bgImage: "https://framerusercontent.com/images/kSBqNFitJQuBzXuk7tl1FqlAHhs.png",
        innerImage: "https://framerusercontent.com/images/Jt7zqgTjQMYT15YvEkLGKiF9Cw.png"
    },
    {
        id: "05",
        title: "Atelier Nara",
        slug: "atelier-nara",
        tag: "Website",
        bgImage: "https://framerusercontent.com/images/svmMd86RbsKfib7KzvpKAUsHrk.png",
        innerImage: "https://framerusercontent.com/images/7WVAcnCw5jrTdcET3CmMrpU7gf0.png"
    }
];

const ProjectCard = ({ project }: { project: any }) => {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    
    // Mouse position state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for the cursor
    const mouseXSpring = useSpring(x, { stiffness: 500, damping: 50 });
    const mouseYSpring = useSpring(y, { stiffness: 500, damping: 50 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
    };

    return (
        <Link 
            ref={cardRef}
            href={`/work/${project.slug}`} 
            className={styles.projectCard}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={styles.imageContainer}>
                {/* Background Image */}
                <div className={styles.bgImageWrapper}>
                    <Image 
                        src={project.bgImage} 
                        alt={`${project.title} background`}
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized
                    />
                </div>
                {/* Inner Centered Image */}
                <div className={styles.innerImageWrapper}>
                    <Image 
                        src={project.innerImage} 
                        alt={`${project.title} inner`}
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized
                    />
                </div>
                {/* Hover Banner with Tag */}
                <div className={styles.hoverBanner}>
                    <span className={styles.bannerTag}>{project.tag}</span>
                </div>

                {/* Floating VIEW Button */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        x: mouseXSpring,
                        y: mouseYSpring,
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0.5,
                        pointerEvents: 'none',
                        zIndex: 10,
                    }}
                >
                    <div className={styles.floatingViewBtn}>VIEW</div>
                </motion.div>
            </div>
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
    );
};

export function AllWorks() {
    return (
        <section className={styles.allWorksSection}>
            <div className={styles.metaBar}>
                <span>© Curated Interfaces</span>
                <span>(WDX® — 02)</span>
                <span>Digital Designer</span>
            </div>
            
            <div className={styles.container}>
                {/* Left Sticky Heading */}
                <div className={styles.headingWrapper}>
                    <div className={styles.headingContent}>
                        <h1 className={styles.headingText}>
                            All<br />Works
                        </h1>
                        <div className={styles.headingNumber}>
                            <h3>(5)</h3>
                        </div>
                    </div>
                </div>

                {/* Right Scrollable Cards */}
                <div className={styles.cardsWrapper}>
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
