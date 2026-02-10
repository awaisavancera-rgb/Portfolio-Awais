import Banner from "./banner";
import { Portfolio } from "@/components/Portfolio";
import { IntroScroll } from "@/components/IntroScroll";

export default function Home() {
  return (
    <main id="main-content" style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#000' }}>
      <Banner />
      <IntroScroll />
      <Portfolio />
    </main>
  );
}

