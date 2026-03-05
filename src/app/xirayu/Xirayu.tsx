"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FlowingSphereBackground from "@/components/ui/FlowingSphere";
import StarfieldWarp from "@/components/ui/StarfieldWarp";
import StaggeredMenu from "@/components/ui/StaggeredMenu";
import { MENU_ITEMS, SOCIAL_ITEMS } from "@/config/menu";

const baseConfig = {
  noise: 0.0,
  bloom: 1.21,
  hueShift: -0.03,
  satMin: 0.0,
  satMax: 2.5,
  satSpeed: 0.0,
  radius: 0.5,
  scale: 1.0,
  offsetY: 0.0,
} as const;

export type XirayuScreenSize = "mobile" | "tablet" | "desktop";

export default function XirayuShell({
  children,
  isLoaded,
  saturation,
  screenSize,
}: {
  children: React.ReactNode;
  isLoaded: boolean;
  saturation: number;
  screenSize: XirayuScreenSize;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sphereReady, setSphereReady] = useState(false);
  const [starfieldReady, setStarfieldReady] = useState(false);

  const backgroundVisible = isLoaded && sphereReady && starfieldReady;

  const pageConfig = useMemo(
    () => ({
      ...baseConfig,
      glow: screenSize === "mobile" ? 0.30 : 0.42,
    }),
    [screenSize]
  );

  return (
    <main className="relative w-full bg-black text-white overflow-x-hidden">
      <Link
        href="/"
        className={`fixed top-6 left-5 md:top-8 md:left-10 lg:left-16 z-50 inline-flex items-center gap-2 text-xs md:text-sm font-light tracking-[0.45em] uppercase text-white/70 hover:text-white transition-all duration-500 group ${
          isMenuOpen ? "pointer-events-none" : ""
        }
          ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
        `}
        style={{ fontFamily: "var(--font-geist-mono)" }}
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
        colors={["#9eb6efff", "#2788ffff"]}
        accentColor="#6ba9ffff"
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
        isFixed={true}
        displayLogo={false}
        toggleClassName={`
          fixed top-6 right-5 md:top-8 md:right-10 lg:right-16 z-50 
          text-xs md:text-sm font-light tracking-[0.45em] uppercase 
          transition-all duration-500 hover:text-white
          ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
        `}
        toggleStyle={{ fontFamily: "var(--font-geist-mono)" }}
      />

      <FlowingSphereBackground
        className={`pointer-events-none select-none fixed inset-0 transition-opacity duration-[1200ms] ease-out ${
          backgroundVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ zIndex: 0 }}
        config={pageConfig}
        saturationOverride={saturation}
        onReady={() => setSphereReady(true)}
      />

      <StarfieldWarp
        count={screenSize === "mobile" ? 140 : 220}
        color="#3c5c6f6a"
        className={`pointer-events-none select-none fixed inset-0 transition-opacity duration-[1200ms] ease-out ${
          backgroundVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ zIndex: 0, opacity: backgroundVisible ? 0.55 : 0 }}
        onReady={() => setStarfieldReady(true)}
      />

      <div
        className={`fixed inset-0 z-0 pointer-events-none bg-gradient-to-t from-black/90 via-black/40 to-transparent lg:hidden transition-opacity duration-[1200ms] ease-out ${
          backgroundVisible ? "opacity-80" : "opacity-0"
        }`}
      />

      {children}
    </main>
  );
}
