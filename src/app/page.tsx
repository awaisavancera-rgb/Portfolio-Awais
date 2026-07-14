import Banner from "./banner";
import { Portfolio } from "@/components/Portfolio";
import { IntroScroll } from "@/components/IntroScroll";
import { HomeExpertise } from "@/components/HomeExpertise";
import { About } from "@/components/About";
import { Reviews } from "@/components/Reviews";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main id="main-content" style={{ backgroundColor: '#000' }}>
      <Banner />
      <IntroScroll />
      <Portfolio />
      <HomeExpertise />
      <About />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}

