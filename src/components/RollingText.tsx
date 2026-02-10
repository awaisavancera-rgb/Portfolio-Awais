"use client"

import React from "react"
import { motion } from "framer-motion"

interface RollingTextProps {
    text: string
    className?: string
    trigger?: boolean // If external trigger is needed
}

export const RollingText = ({ text, className, trigger }: RollingTextProps) => {
    return (
        <div
            className={className}
            style={{
                position: 'relative',
                overflow: 'hidden',
                display: 'inline-block',
                verticalAlign: 'middle'
            }}
        >
            <motion.div
                initial={false}
                animate={trigger !== undefined ? (trigger ? "hover" : "initial") : undefined}
                whileHover={trigger === undefined ? "hover" : undefined}
                style={{ position: 'relative' }}
            >
                <motion.div
                    variants={{
                        initial: { y: 0 },
                        hover: { y: "-100%" }
                    }}
                    transition={{ duration: 0.4, ease: [0.6, 0.01, 0.05, 0.95] }}
                >
                    {text}
                </motion.div>
                <motion.div
                    style={{ position: 'absolute', top: '100%', left: 0, width: '100%' }}
                    variants={{
                        initial: { y: 0 },
                        hover: { y: "-100%" }
                    }}
                    transition={{ duration: 0.4, ease: [0.6, 0.01, 0.05, 0.95] }}
                >
                    {text}
                </motion.div>
            </motion.div>
        </div>
    )
}
