import React from 'react';
import { ArrowButtonV2 } from './ArrowButtonV2';
import styles from './button-showcase.module.css';

export function ButtonShowcase() {
    return (
        <section className={styles.showcaseSection}>
            <h2 className={styles.title}>Buttons Showcase</h2>
            <div className={styles.buttonsGrid}>
                {/* Right Arrow Button */}
                <ArrowButtonV2 text="Arrow Button v2" direction="right" />
                
                {/* Left Arrow Button */}
                <ArrowButtonV2 text="Go Back" direction="left" />
            </div>
        </section>
    );
}
