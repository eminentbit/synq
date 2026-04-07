import { useState } from "react";
import { ConsumerHero } from "./components/landing/ConsumerHero";
import { NicheSection, TechStackSection } from "./components/landing/NicheSection";
import { NavBar } from "./components/landing/NavBar";
import { ParallaxAccents } from "./components/landing/ParallaxAccents";
import {
  ColdStartSection,
  EngagementSection,
  ThesisSection,
} from "./components/landing/InsightSections";
import { navLinks } from "./components/landing/content";
import { useScrollY } from "./hooks/useScrollY";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollY = useScrollY();

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-[#f6f2e9] text-[#1e2e2b]">
      <ParallaxAccents scrollY={scrollY} />
      <NavBar
        navLinks={navLinks}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main>
        <ConsumerHero />
        <ThesisSection />
        <EngagementSection />
        <TechStackSection />
        <ColdStartSection />
        <NicheSection />
      </main>

      <footer className="border-t border-[#d9d2c4] bg-[#efe8da]">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-[#4d5f5c] sm:px-6">
          <p>© 2026 Trueconvos</p>
          <a
            href="#join"
            className="font-semibold text-[#1f3532] transition hover:text-[#0f8f7b]"
          >
            Join the waitlist
          </a>
        </div>
      </footer>
    </div>
  );
}
