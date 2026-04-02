"use client";

import { useRef } from "react";

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

  useCanvasParticles({ canvasRef });
  useScrollReveal();

  return (
    <>
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
