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
    { label: "Oct", value: "+1k", height: "20%" },
    { label: "Nov", value: "+1.3k", height: "35%" },
    { label: "Dec", value: "+1.8k", height: "50%" },
    { label: "Jan", value: "+2.5k", height: "65%" },
    { label: "Feb", value: "+3.8k", height: "80%" },
    { label: "Mar", value: "+5.9k", height: "100%", highlight: true },
]

export const BarChart = ({ data = defaultData }: { data?: BarData[] }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!containerRef.current) return

        const bars = containerRef.current.querySelectorAll(`.${styles.bar}`)

        gsap.fromTo(bars,
            { scaleY: 0 },
            {
                scaleY: 1,
                duration: 1,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%",
                }
            }
        )

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
