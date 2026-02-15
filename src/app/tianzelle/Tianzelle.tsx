"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ForestHouse from "@/components/ui/ForestHouse";
import FlockingBackground from "@/components/ui/FlockingBackground";
import StaggeredMenu from "@/components/ui/StaggeredMenu";
import { MENU_ITEMS, SOCIAL_ITEMS } from "@/config/menu";

export default function TianzelleShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [viewport, setViewport] = useState<{ w: number; h: number }>(() => {
    if (typeof window === "undefined") return { w: 1024, h: 768 };
    const vv = window.visualViewport;
    return {
      w: Math.round(vv?.width ?? window.innerWidth),
      h: Math.round(vv?.height ?? window.innerHeight),
    };
  });
  const [deviceHints, setDeviceHints] = useState<{
    coarsePointer: boolean;
    hoverNone: boolean;
    maxTouchPoints: number;
  }>(() => {
    if (typeof window === "undefined") {
      return { coarsePointer: false, hoverNone: false, maxTouchPoints: 0 };
    }

    return {
      coarsePointer: window.matchMedia?.("(pointer: coarse)")?.matches ?? false,
      hoverNone: window.matchMedia?.("(hover: none)")?.matches ?? false,
      maxTouchPoints: navigator.maxTouchPoints ?? 0,
    };
  });

  useEffect(() => {
    const readViewport = () => {
      const vv = window.visualViewport;
      setViewport({
        w: Math.round(vv?.width ?? window.innerWidth),
        h: Math.round(vv?.height ?? window.innerHeight),
      });
    };

    window.addEventListener("resize", readViewport, { passive: true });
    window.addEventListener("orientationchange", readViewport, { passive: true });
    window.visualViewport?.addEventListener("resize", readViewport, { passive: true });

    return () => {
      window.removeEventListener("resize", readViewport);
      window.removeEventListener("orientationchange", readViewport);
      window.visualViewport?.removeEventListener("resize", readViewport);
    };
  }, []);

  useEffect(() => {
    const coarseMq = window.matchMedia?.("(pointer: coarse)");
    const hoverMq = window.matchMedia?.("(hover: none)");

    const readHints = () => {
      setDeviceHints({
        coarsePointer: coarseMq?.matches ?? false,
        hoverNone: hoverMq?.matches ?? false,
        maxTouchPoints: navigator.maxTouchPoints ?? 0,
      });
    };

    readHints();

    type LegacyMediaQueryList = MediaQueryList & {
      addListener?: (listener: () => void) => void;
      removeListener?: (listener: () => void) => void;
    };

    const add = (mq: MediaQueryList | undefined) => {
      if (!mq) return;
      if (typeof mq.addEventListener === "function") mq.addEventListener("change", readHints);
      else (mq as LegacyMediaQueryList).addListener?.(readHints);
    };
    const remove = (mq: MediaQueryList | undefined) => {
      if (!mq) return;
      if (typeof mq.removeEventListener === "function") mq.removeEventListener("change", readHints);
      else (mq as LegacyMediaQueryList).removeListener?.(readHints);
    };

    add(coarseMq);
    add(hoverMq);

    return () => {
      remove(coarseMq);
      remove(hoverMq);
    };
  }, []);

  const renderRegion = useMemo(() => {
    return {
      anchor: "bottomRight" as const,
      widthVw: 100,
      heightVh: 80,
      maxWidthPx: 2200,
      maxHeightPx: 1200,
      marginPx: 0,
    };
  }, []);

  const forestFitOffset = useMemo(() => {
    const isMobileLike =
      deviceHints.coarsePointer || (deviceHints.hoverNone && deviceHints.maxTouchPoints > 0);
    if (!isMobileLike) {
      return { mode: "screen" as const, x: 0.3, y: 0.15 };
    }

    const isLandscape = viewport.w > viewport.h;
    if (isLandscape) {
      return { mode: "screen" as const, x: -0.12, y: -0.12 };
    }

    return { mode: "screen" as const, x: -0.12, y: -0.18 };
  }, [deviceHints.coarsePointer, deviceHints.hoverNone, deviceHints.maxTouchPoints, viewport.h, viewport.w]);

  return (
    <div className="tianzelle relative w-full overflow-x-hidden text-white">
      {/* Pink, healing base tone */}
      <div className="fixed inset-0 z-0 bg-rose-100 dark:bg-rose-950" />

      {/* Subtle flocking layer (bottom-most animated background) */}
      <FlockingBackground
        className="opacity-50"
        color="#ff154f"
        opacity={0.45}
        forwardAxis="x"
        simSize={16}
        bounds={250}
        mouseStrength={1}
        mouseMode="repel"
      />
      <Link
        href="/"
        className={`fixed top-6 left-5 md:top-8 md:left-10 lg:left-16 z-50 inline-flex items-center gap-2 text-xs md:text-sm font-light tracking-[0.45em] uppercase text-black/70 dark:text-white/70 transition-all duration-500 hover:text-black dark:hover:text-white group
          ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}
          ${isMenuOpen ? "lg:opacity-100 lg:pointer-events-auto" : ""}
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
        menuButtonColor="var(--tz-menu-toggle-color)"
        openMenuButtonColor="var(--tz-menu-toggle-color-open)"
        changeMenuColorOnOpen={true}
        colors={["#fecdd3ff", "#fb7185ff"]}
        accentColor="#f43f5eff"
        isFixed={true}
        displayLogo={false}
        toggleClassName="fixed top-6 right-5 md:top-8 md:right-10 lg:right-16 z-50 text-xs md:text-sm !font-light tracking-[0.45em] uppercase transition-opacity duration-500 opacity-90 hover:opacity-100"
        toggleStyle={{ fontFamily: "var(--font-geist-mono)" }}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />

      {/* Bias the fitted camera to keep the house mostly "facing left" */}
      <ForestHouse
        transparentBackground
        mode="followMouse"
        followStrength={0.5}
        followThetaRange={0.22}
        followPhiRange={0}
        fitToModel
        fitPadding={0.85}
        fitAzimuthOffset={Math.PI / 6}
        fitOffset={forestFitOffset}
        renderRegion={renderRegion}
        className="opacity-100"
      />

      <div className="relative z-20">{children}</div>
    </div>
  );
}
