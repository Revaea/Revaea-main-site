"use client";

import { useEffect } from "react";

export default function SystemThemeSync() {
  useEffect(() => {
    const root = document.documentElement;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = () => {
      root.classList.toggle("dark", mql.matches);
    };

    apply();

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", apply);
      return () => mql.removeEventListener("change", apply);
    }

    const legacyMql = mql as unknown as {
      addListener?: (listener: () => void) => void;
      removeListener?: (listener: () => void) => void;
    };

    legacyMql.addListener?.(apply);
    return () => legacyMql.removeListener?.(apply);
  }, []);

  return null;
}
