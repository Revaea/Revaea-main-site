import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TerminalSection from "@/components/TerminalSection";
import LockdownOverlay from "@/components/LockdownOverlay";
import SmoothScrollEnhancer from "@/components/SmoothScrollEnhancer";
import HeroSection from "@/components/HeroSection";
import ViewportHeightFix from "@/components/ViewportHeightFix";
import SnapContainer from "@/components/SnapContainer";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <ViewportHeightFix />
      <SmoothScrollEnhancer />
      <SnapContainer className="relative h-[100svh] h-[100dvh] h-[var(--app-height)] overflow-y-auto">
        <Link
          href="/"
          className="fixed top-6 left-5 md:top-8 md:left-10 lg:left-16 z-50 inline-flex items-center gap-2 text-xs md:text-sm font-light tracking-[0.45em] uppercase text-white/70 hover:text-white transition-all duration-500 group"
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
