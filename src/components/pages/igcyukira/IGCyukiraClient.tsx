"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ArrowLeft } from "lucide-react";

import { CrystalCanvas } from "@/components/pages/igcyukira/CrystalCanvas";
import { CrystalCursorLayer } from "@/components/pages/igcyukira/CrystalCursorLayer";
import { TopNav } from "@/components/pages/igcyukira/TopNav";
import { useCanvasParticles } from "@/components/pages/igcyukira/hooks/useCanvasParticles";
import { useScrollReveal } from "@/components/pages/igcyukira/hooks/useScrollReveal";

import { CycleSection } from "@/components/pages/igcyukira/sections/CycleSection";
import { DualitySection } from "@/components/pages/igcyukira/sections/DualitySection";
import { FooterSection } from "@/components/pages/igcyukira/sections/FooterSection";
import { FormulaSection } from "@/components/pages/igcyukira/sections/FormulaSection";
import { HeroSection } from "@/components/pages/igcyukira/sections/HeroSection";
import { IdentitySection } from "@/components/pages/igcyukira/sections/IdentitySection";

export function IGCyukiraClient() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setIsLoaded(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  useCanvasParticles({ canvasRef });
  useScrollReveal();

  return (
    <>
      <Link
        href="/"
        aria-label="Back to home"
        className={`fixed top-6 left-5 z-[200] inline-flex items-center gap-2 text-xs font-light tracking-[0.45em] uppercase opacity-70 transition-all duration-500 hover:opacity-100 group md:top-8 md:left-10 md:text-sm lg:left-16 ${
          isLoaded ? "translate-y-0 opacity-70" : "-translate-y-4 opacity-0"
        }`}
        style={{ fontFamily: "var(--font-mono-family)" }}
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
        <span className="tracking-[0.55em]">BACK</span>
      </Link>

      <CrystalCursorLayer interactiveSelector="a, button, .name-card, .formula-card" />
      <CrystalCanvas canvasRef={canvasRef} />

      <TopNav />

      <HeroSection />
      <IdentitySection />
      <DualitySection />
      <CycleSection />
      <FormulaSection />
      <FooterSection />
    </>
  );
}
