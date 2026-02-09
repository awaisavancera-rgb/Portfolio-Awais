import Banner from "./banner";
import { Portfolio } from "@/components/Portfolio";

export default function Home() {
  return (
    <div className="container">
      <div className="card-wrapper">
        <Banner />
        <Portfolio />
      </div>
    </div>
  );
}

