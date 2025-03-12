import { useEffect, useState } from "react";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  StarsCanvas,
  Tech,
  Works,
} from "@/components";
import HeroBackground from "@/components/HeroBackground";
import EarthContainer from "@/components/EarthContainer";
import PlayerContainer from "@/components/PlayerContainer";
import UpArrow from "./../public/assets/icons/up-arrow.svg";
import Services from "@/components/Services";

function App({ loading }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <main className="relative z-0 w-full h-full">
      <div className="bg-center bg-no-repeat bg-cover ">
        <Navbar />
        <HeroBackground />
        <Hero loading={loading} isMobile={isMobile} />
      </div>
      <section className="relative z-0 flex flex-col-reverse w-full h-full overflow-hidden md:flex-row">
        <About />
        {!isMobile && <PlayerContainer isMobile={isMobile} />}
      </section>
      <Services />
      <Experience />
      <Tech />
      <Works />
      {/* <Feedbacks /> */}
      <section className="relative z-0 flex flex-col-reverse justify-between w-full h-full p-2 pb-8 overflow-x-hidden md:flex-row sm:p-8">
        <Contact />
        <EarthContainer isMobile={isMobile} />
        <StarsCanvas />
      </section>
      <button
        onClick={() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }}
        className="fixed w-8 h-8 p-2 text-center transition-all duration-300 rounded-lg md:w-10 md:h-10 bottom-8 md:right-10 right-8 text-secondary backdrop-filter backdrop-blur-xl bg-opacity-20 bg-tertiary hover:scale-110"
      >
        <UpArrow />
      </button>
    </main>
  );
}

export default App;
