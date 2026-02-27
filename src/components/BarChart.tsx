"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import styles from "./barChart.module.css"

interface BarData {
    label: string
    value: string
    height: string // percentage like "40%"
    highlight?: boolean
}

const defaultData: BarData[] = [
    { label: "Oct", value: "+1k", height: "5vw" },
    { label: "Nov", value: "+1.3k", height: "6vw" },
    { label: "Dec", value: "+1.8k", height: "7vw" },
    { label: "Jan", value: "+2.5k", height: "8vw" },
    { label: "Feb", value: "+3.8k", height: "9vw" },
    { label: "Mar", value: "+5.9k", height: "10vw", highlight: true },
]

export const BarChart = ({ data = defaultData }: { data?: BarData[] }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!containerRef.current) return

        const bars = containerRef.current.querySelectorAll(`.${styles.bar}`)

        const tl = gsap.timeline({
            repeat: -1,
            repeatDelay: 1.5,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 95%",
            }
        })

        // Build up: Grow bars one by one
        tl.fromTo(bars,
            { scaleY: 0.2 },
            {
                scaleY: 1,
                duration: 0.8,
                stagger: 0.8, // Increased stagger for better one-by-one feel
                ease: "power2.out"
            }
        )
            // Hold: Keep them all grown for a moment
            .to({}, { duration: 1 })
            // Reset: Quickly bring them back down to start the loop over
            .to(bars, {
                scaleY: 0.2,
                duration: 0.8,
                stagger: 0.8,
                ease: "power2.in"
            })

    }, { scope: containerRef })

    return (
        <div ref={containerRef} className={styles.chartContainer}>
            {data.map((item, index) => (
                <div key={index} className={styles.barWrapper}>
                    <div
                        className={`${styles.bar} ${item.highlight ? styles.highlight : ''}`}
                        style={{ height: item.height }}
                    >
                        <span className={styles.barText}>{item.value}</span>
                    </div>
                    <span className={styles.label}>{item.label}</span>
                </div>
            ))}
        </div>
    )
}
