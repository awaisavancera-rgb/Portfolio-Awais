"use client";

import React, { useRef } from "react";
import Image, { ImageProps } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./parallaxImage.module.css";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface ParallaxWrapperProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    speed?: number;          // Default: 20 (moves yPercent from -20% to 0%)
    fromY?: number;          // Custom start yPercent (e.g. -20)
    toY?: number;            // Custom end yPercent (e.g. 0)
    scrub?: number | boolean;// Default: 1.5 (smooth damping inertia)
    start?: string;          // Default: "top bottom"
    end?: string;            // Default: "bottom top"
}

/**
 * Reusable Parallax Wrapper:
 * Can wrap any image, Next.js Image, video, or element.
 * Automatically handles overflow masking and GSAP ScrollTrigger parallax.
 */
export function ParallaxWrapper({
    children,
    className = "",
    style,
    speed = 20,
    fromY,
    toY = 0,
    scrub = 1.5,
    start = "top bottom",
    end = "bottom top",
}: ParallaxWrapperProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    const initialY = fromY !== undefined ? fromY : -Math.abs(speed);
    const extraTravel = Math.abs(initialY - toY);

    useGSAP(
        () => {
            if (!containerRef.current || !innerRef.current) return;

            gsap.fromTo(
                innerRef.current,
                { yPercent: initialY },
                {
                    yPercent: toY,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: start,
                        end: end,
                        scrub: scrub,
                    },
                }
            );
        },
        { scope: containerRef, dependencies: [initialY, toY, scrub, start, end] }
    );

    return (
        <div
            ref={containerRef}
            className={`${styles.container} ${className}`}
            style={style}
        >
            <div
                ref={innerRef}
                className={styles.inner}
                style={{
                    height: `${100 + extraTravel + 5}%`,
                }}
            >
                {children}
            </div>
        </div>
    );
}

export interface ParallaxImageProps extends Omit<ParallaxWrapperProps, "children"> {
    src: ImageProps["src"];
    alt: string;
    priority?: boolean;
    unoptimized?: boolean;
    objectFit?: "cover" | "contain";
    objectPosition?: string;
    imageClassName?: string;
}

/**
 * Reusable Parallax Image:
 * Drop-in replacement for images with built-in GSAP scroll parallax.
 * Adapts to any parent width / height.
 */
export function ParallaxImage({
    src,
    alt,
    priority = false,
    unoptimized = false,
    objectFit = "cover",
    objectPosition = "center",
    imageClassName = "",
    ...wrapperProps
}: ParallaxImageProps) {
    return (
        <ParallaxWrapper {...wrapperProps}>
            <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                unoptimized={unoptimized}
                className={imageClassName}
                style={{ objectFit, objectPosition }}
            />
        </ParallaxWrapper>
    );
}
