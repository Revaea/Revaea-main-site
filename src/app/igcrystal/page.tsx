"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TerminalSection from "@/components/pages/igcrystal/TerminalSection";
import LockdownOverlay from "@/components/pages/igcrystal/LockdownOverlay";
import SmoothScrollEnhancer from "@/components/pages/igcrystal/SmoothScrollEnhancer";
import HeroSection from "@/components/pages/igcrystal/HeroSection";
import ViewportHeightFix from "@/components/pages/igcrystal/ViewportHeightFix";
import SnapContainer from "@/components/pages/igcrystal/SnapContainer";

export const dynamic = "force-dynamic";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => setIsLoaded(true));
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      <ViewportHeightFix />
      <SmoothScrollEnhancer />
      <SnapContainer className="relative h-[100svh] h-[100dvh] h-[var(--app-height)] overflow-y-auto">
        <Link
          href="/"
          className={`fixed top-6 left-5 md:top-8 md:left-10 lg:left-16 z-50 inline-flex items-center gap-2 text-xs md:text-sm font-light tracking-[0.45em] uppercase text-white/70 hover:text-white transition-all duration-500 group ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
          <span className="tracking-[0.55em]">BACK</span>
        </Link>
        <LockdownOverlay />
        <HeroSection />
        <TerminalSection id="terminal" />
      </SnapContainer>
    </>
  );
}
