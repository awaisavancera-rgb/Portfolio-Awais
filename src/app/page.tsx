import Banner from "./banner";
import { Portfolio } from "@/components/Portfolio";
import { IntroScroll } from "@/components/IntroScroll";

export default function Home() {
  return (
    <main id="main-content" style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#000' }}>
      <div style={{ padding: '2rem', color: '#fff' }}>
        <h1>Muhammad Awais - Portfolio</h1>
        <p>Site is loading...</p>
      </div>
      <Banner />
      <IntroScroll />
      <Portfolio />
    </main>
  );
}

