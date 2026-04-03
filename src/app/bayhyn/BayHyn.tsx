"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";
import StaggeredMenu from "@/components/ui/StaggeredMenu";
import { MENU_ITEMS, SOCIAL_ITEMS } from "@/config/menu";

const BackgroundWhirlpool = dynamic(() => import("@/components/ui/background/BackgroundWhirlpool"), {
  ssr: false,
});

type BayHynBackgroundContextValue = {
  setScrollRatio: (ratio01: number) => void;
};

const BayHynBackgroundContext = createContext<BayHynBackgroundContextValue | null>(null);

export function useBayHynBackground() {
  const ctx = useContext(BayHynBackgroundContext);
  if (!ctx) {
    throw new Error("useBayHynBackground must be used within BayHynShell");
  }
  return ctx;
}

export default function BayHynShell({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollRatio, setScrollRatio] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [whirlpoolReady, setWhirlpoolReady] = useState(false);

  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => setIsLoaded(true));
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const saturation = useMemo(() => {
    const r = Math.min(1, Math.max(0, scrollRatio));
    return 0 + 0.6 * r;
  }, [scrollRatio]);

  return (
    <BayHynBackgroundContext.Provider value={{ setScrollRatio }}>
      <main className="relative w-full min-h-screen overflow-x-hidden bg-[#020617]">

      <Link
        href="/"
        className={`fixed top-6 left-5 md:top-8 md:left-10 lg:left-16 z-50 inline-flex items-center gap-2 text-xs md:text-sm font-light tracking-[0.45em] uppercase text-white/70 hover:text-white transition-all duration-500 group ${
          isMenuOpen ? "pointer-events-none" : ""
        }
          ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
        `}
        style={{ fontFamily: "var(--font-mono-family)" }}
      >
        <ArrowLeft className="w-4 h-4 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
        <span className="tracking-[0.55em]">BACK</span>
      </Link>

      <StaggeredMenu
        position="right"
        items={MENU_ITEMS}
        socialItems={SOCIAL_ITEMS}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="rgba(255, 255, 255, 0.7)"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen={true}
        colors={["#b4a2fdff", "#a855f7ff"]}
        accentColor="#c793ffff"
        isFixed={true}
        displayLogo={false}
        toggleClassName={`fixed top-6 right-5 md:top-8 md:right-10 lg:right-16 z-50 text-xs md:text-sm font-light tracking-[0.45em] uppercase text-white/70 transition-all duration-500 hover:text-white mix-blend-difference ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
        toggleStyle={{ fontFamily: "var(--font-mono-family)" }}
    
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />

      <div
        className={`fixed inset-0 z-0 h-dvh w-screen transition-opacity duration-[1200ms] ease-out ${
          whirlpoolReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <BackgroundWhirlpool 
            className="h-full w-full" 
            blur={0} 
            particleCount={100} 
            spread={600}
            enablePointerTracking={false}
            attractionStrength={0}
            saturation={saturation}
            onReady={() => {
              requestAnimationFrame(() => {
                requestAnimationFrame(() => setWhirlpoolReady(true));
              });
            }}
        >
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-purple-950/30 via-fuchsia-950/10 to-slate-950/75" />
          <div className="absolute -inset-[18%] pointer-events-none will-change-transform bg-[radial-gradient(circle_at_28%_18%,theme(colors.fuchsia.300/0.14),transparent_55%),radial-gradient(circle_at_72%_78%,theme(colors.violet.300/0.12),transparent_50%)] animate-[revaea-nebula-drift_18s_ease-in-out_infinite] motion-reduce:animate-none" />
        </BackgroundWhirlpool>
      </div>

      <div className="relative z-10">
        {children}
      </div>
      
      </main>
    </BayHynBackgroundContext.Provider>
  );
}
