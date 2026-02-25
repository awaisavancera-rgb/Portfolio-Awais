import Banner from "./banner";
import { Portfolio } from "@/components/Portfolio";
import { IntroScroll } from "@/components/IntroScroll";
import { Expertise } from "@/components/Expertise";
import { About } from "@/components/About";

export default function Home() {
  return (
    <main id="main-content" style={{ backgroundColor: '#000' }}>
      <Banner />
      <IntroScroll />
      <Portfolio />
      <Expertise />
      <About />
    </main>
  );
}

