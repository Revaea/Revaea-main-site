"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideChrome =
    pathname === "/bayhyn" ||
    pathname.startsWith("/bayhyn/") ||
    pathname === "/xirayu" ||
    pathname.startsWith("/xirayu/") ||
    pathname === "/igcrystal" ||
    pathname.startsWith("/igcrystal/");

  if (hideChrome) {
    return <div className="contents">{children}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="contents">{children}</div>
      <Footer />
    </>
  );
}
