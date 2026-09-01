import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./contact.module.css";

export default function ContactPage() {
    return (
        <main id="main-content" className={styles.contactSection}>
            <div className={styles.metaBar}>
                <div className={styles.metaCol}>
                    <span className={styles.metaLabel}>Quick Links</span>
                    <span className={styles.metaValue}>Home, Gallery, Work, Contact</span>
                </div>
                <div className={styles.metaCol} style={{ alignItems: 'flex-end' }}>
                    <span className={styles.metaLabel}>Based in Tokyo 東京</span>
                    <span className={styles.metaValue}>Art Director + Framer Developer</span>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.top}>
                    {/* The White Strip */}
                    <div className={styles.whiteStripContainer}>
                        <div className={styles.whiteStrip}>
                            <p>Fly</p>
                            <p>Call Me</p>
                            <p>24/7 Support</p>
                            <p>Remote</p>
                        </div>
                    </div>

                    <div className={styles.leftColumn}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src="https://framerusercontent.com/images/BChNf0ssn5x1I9kAk4vwX8qT5o.png"
                                alt="Woman Staircase"
                                fill
                                priority
                                style={{ objectFit: "cover", objectPosition: "center" }}
                                unoptimized
                            />
                        </div>
                    </div>

                    <div className={styles.rightColumn}>
                        <div className={styles.lists}>
                            <Link href="https://www.framer.com/@westhill-studio/" target="_blank" className={styles.listItem}>
                                <div className={styles.listItemContent}>
                                    <span className={styles.listItemText}>Office: Tokyo, Japan.</span>
                                    <ArrowUpRight className={styles.icon} />
                                </div>
                                <div className={styles.line}></div>
                            </Link>

                            <Link href="https://www.instagram.com/" target="_blank" className={styles.listItem}>
                                <div className={styles.listItemContent}>
                                    <span className={styles.listItemText}>Follow me on Instagram</span>
                                    <ArrowUpRight className={styles.icon} />
                                </div>
                                <div className={styles.line}></div>
                            </Link>

                            <Link href="tel:+1345664565" className={styles.listItem}>
                                <div className={styles.listItemContent}>
                                    <span className={styles.listItemText}>+1 34566 4565</span>
                                    <ArrowUpRight className={styles.icon} />
                                </div>
                                <div className={styles.line}></div>
                            </Link>

                            <Link href="mailto:sayhi@akihiko.com" className={styles.listItem}>
                                <div className={styles.listItemContent}>
                                    <span className={styles.listItemText}>sayhi@akihiko.com</span>
                                    <ArrowUpRight className={styles.icon} />
                                </div>
                                <div className={styles.line}></div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.bottomLine}></div>
                    <h1 className={styles.hugeText}>Contact Now</h1>
                </div>
            </div>
        </main>
    );
}
