"use client"

import Banner from "../banner";
import { IntroScroll } from "@/components/IntroScroll";
import { PortfolioV2 } from "@/components/PortfolioV2";
import { Expertise } from "@/components/Expertise";
import { About } from "@/components/About";

export default function PortfolioV2Page() {
    return (
        <main id="main-content" style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#000' }}>
            <Banner />
            <IntroScroll />
            <PortfolioV2 />
            <Expertise />
            <About />
        </main>
    );
}

