import React from "react";

interface FiverrIconProps {
    size?: number | string;
    className?: string;
    strokeWidth?: number | string;
}

export function FiverrIcon({ size = 18, className = "", strokeWidth = 12 }: FiverrIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 192 192"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M121.1 170h34.75V67.04H90.21v-7.72s0-9.01 9.01-9.01h21.88V22H99.22s-43.76 0-43.76 37.32v7.72h-19.3v28.31h19.3v74.64h34.75V95.36h30.89V170Z"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
                fill="none"
            />
        </svg>
    );
}

export default FiverrIcon;
