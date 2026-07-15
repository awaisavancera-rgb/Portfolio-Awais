import React from 'react';
import styles from './arrow-button-v2.module.css';

interface ArrowButtonProps {
    text?: string;
    direction?: "left" | "right";
    onClick?: () => void;
}

export function ArrowButtonV2({ text = "Arrow Button v2", direction = "right", onClick }: ArrowButtonProps) {
    return (
        <div className={styles.buttonContainer} data-direction={direction} onClick={onClick}>
            <span className={styles.text}>{text}</span>
            <div className={styles.arrowWrapper}>
                <div className={styles.arrowContainer}>
                    <svg className={styles.arrow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}
