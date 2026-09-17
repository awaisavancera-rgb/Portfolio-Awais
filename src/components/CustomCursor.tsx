"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./custom-cursor.module.css";

// 48px native size scaled down to ~14px gives ultra-crisp anti-aliasing
const DEFAULT_SCALE = 0.292; // 48px * 0.292 ≈ 14px
const TEXT_SCALE = 1.4;     // 48px * 1.4 ≈ 67px

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    const [isHovered, setIsHovered] = useState(false);
    const [cursorText, setCursorText] = useState("");

    const isHoveredRef = useRef(false);
    const cursorTextRef = useRef("");
    const isVisibleRef = useRef(false);

    useEffect(() => {
        // Disable completely on touch/mobile devices
        const isTouchDevice =
            window.matchMedia("(pointer: coarse)").matches ||
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0;

        if (isTouchDevice) return;

        // Add class to body to hide default system cursor on desktop
        document.body.classList.add("custom-cursor-active");

        const cursor = cursorRef.current;
        if (!cursor) return;

        // Center cursor element at mouse coordinates with default scale
        gsap.set(cursor, {
            xPercent: -50,
            yPercent: -50,
            scale: DEFAULT_SCALE,
            force3D: true,
        });

        // Ultra-smooth GSAP quickTo setters with smooth inertia
        const xCursor = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" });
        const yCursor = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" });

        const updateHoverState = (hovered: boolean, text: string) => {
            isHoveredRef.current = hovered;
            cursorTextRef.current = text;
            setIsHovered(hovered);
            setCursorText(text);

            // Do NOT expand on buttons or fields; keep default scale unless explicit text label exists
            const targetScale = text ? TEXT_SCALE : DEFAULT_SCALE;

            gsap.to(cursor, {
                scale: targetScale,
                duration: 0.2,
                ease: "power2.out",
                overwrite: "auto",
            });
        };

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX: x, clientY: y } = e;

            xCursor(x);
            yCursor(y);

            const target = e.target as HTMLElement | null;

            // Check if hovering over an element with its own dedicated cursor (e.g. portfolio cards)
            const hasCustomCursor = target?.closest(
                "[data-cursor='none'], [data-cursor='view'], [class*='projectCard']"
            );

            if (hasCustomCursor) {
                if (isVisibleRef.current) {
                    isVisibleRef.current = false;
                    gsap.to(cursor, { opacity: 0, scale: 0, duration: 0.15, overwrite: "auto" });
                }
                return;
            }

            if (!isVisibleRef.current) {
                isVisibleRef.current = true;
                gsap.to(cursor, { opacity: 1, scale: DEFAULT_SCALE, duration: 0.2, overwrite: "auto" });
            }

            // Detect clickable or interactive elements without expanding into a big circle
            if (target) {
                const clickable = target.closest(
                    "a, button, input, textarea, select, [role='button'], [data-cursor='pointer'], [data-cursor-text], summary"
                );

                const newHovered = Boolean(clickable);
                const newText = clickable ? (clickable.getAttribute("data-cursor-text") || "") : "";

                if (newHovered !== isHoveredRef.current || newText !== cursorTextRef.current) {
                    updateHoverState(newHovered, newText);
                }
            }
        };

        const handleMouseDown = () => {
            // Subtle click compression, never expanding big
            const clickScale = DEFAULT_SCALE * 0.75;

            gsap.to(cursor, {
                scale: clickScale,
                duration: 0.15,
                ease: "power2.out",
                overwrite: "auto",
            });
        };

        const handleMouseUp = () => {
            const releaseScale = cursorTextRef.current ? TEXT_SCALE : DEFAULT_SCALE;

            gsap.to(cursor, {
                scale: releaseScale,
                duration: 0.2,
                ease: "power2.out",
                overwrite: "auto",
            });
        };

        const handleMouseLeave = () => {
            isVisibleRef.current = false;
            gsap.to(cursor, { opacity: 0, duration: 0.2, overwrite: "auto" });
        };

        const handleMouseEnter = () => {
            isVisibleRef.current = true;
            gsap.to(cursor, { opacity: 1, scale: DEFAULT_SCALE, duration: 0.2, overwrite: "auto" });
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.documentElement.addEventListener("mouseleave", handleMouseLeave);
        document.documentElement.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            document.body.classList.remove("custom-cursor-active");
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
            document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className={`
                ${styles.customCursor} 
                ${cursorText ? styles.cursorHasLabel : ""}
            `}
            aria-hidden="true"
        >
            {cursorText && (
                <span className={styles.cursorLabel}>{cursorText}</span>
            )}
        </div>
    );
}
