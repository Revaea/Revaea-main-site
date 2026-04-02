"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { useHeroParallax } from "@/components/pages/igcyukira/hooks/useHeroParallax";

export function HeroSection() {
  const [heroImageFailed, setHeroImageFailed] = useState(false);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const heroBgRef = useRef<HTMLDivElement | null>(null);

  useHeroParallax({ heroContentRef, heroBgRef });

  return (
    <section
      id="hero"
      className="relative z-[1] flex h-screen items-center justify-center overflow-hidden"
    >
      <div
        ref={heroBgRef}
        className="absolute inset-0 [will-change:transform] bg-[radial-gradient(ellipse_80%_60%_at_60%_50%,rgba(184,223,245,0.35)_0%,transparent_70%),radial-gradient(ellipse_40%_80%_at_10%_80%,rgba(126,200,227,0.15)_0%,transparent_60%),radial-gradient(ellipse_50%_40%_at_90%_10%,rgba(58,155,191,0.08)_0%,transparent_60%)]"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(184,223,245,0.32)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(184,223,245,0.32)_1.5px,transparent_1.5px)] bg-[length:60px_60px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_40%,transparent_96%)]"
        aria-hidden="true"
      />

      <div
        ref={heroContentRef}
        className="relative z-10 grid w-full max-w-[1200px] grid-cols-2 items-center gap-24 px-16 [will-change:transform] max-[900px]:grid-cols-1 max-[900px]:gap-12 max-[900px]:px-8"
      >
        <div className="relative">
          <p className="mb-6 font-brandMono text-[0.65rem] tracking-[0.4em] text-[color:var(--crystal)] uppercase opacity-0 animate-[fadeUp_1s_0.3s_forwards]">
            Archive Log / Character Archive
          </p>
          <h1 className="font-brandDisplay text-[clamp(3rem,6.2vw,5.2rem)] font-semibold italic leading-[0.98] text-[color:var(--text-primary)]">
            <span className="flex flex-col gap-3">
              <span className="opacity-0 animate-[blurUp_900ms_0.45s_forwards] motion-reduce:opacity-100 motion-reduce:animate-none motion-reduce:[filter:none]">
                Ice
              </span>
              <span className="text-[color:var(--deep)] opacity-0 animate-[blurUp_900ms_0.55s_forwards] motion-reduce:opacity-100 motion-reduce:animate-none motion-reduce:[filter:none]">
                Glycoside
              </span>
              <span className="text-[color:var(--text-secondary)] opacity-0 animate-[blurUp_900ms_0.65s_forwards] motion-reduce:opacity-100 motion-reduce:animate-none motion-reduce:[filter:none]">
                Crystal
              </span>
            </span>
          </h1>
          <div className="my-8 h-px w-[60px] bg-[linear-gradient(90deg,var(--crystal),transparent)] opacity-0 animate-[fadeUp_1s_0.7s_forwards]" />
          <div className="font-brandDisplay text-[1.1rem] italic leading-[1.8] text-[color:var(--text-secondary)] opacity-0 animate-[fadeUp_1s_0.9s_forwards]">
            The road is long; the dream remains.
            <span className="mt-2 block font-brandMono text-[0.65rem] not-italic tracking-[0.3em] text-[color:var(--text-muted)] uppercase">
              Long Road / Living Dream
            </span>
          </div>
        </div>

        <div className="relative flex items-center justify-center opacity-0 animate-[fadeIn_1.5s_0.4s_forwards] max-[900px]:hidden">
          <div className="absolute left-1/2 top-1/2 z-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(126,200,227,0.4)_0%,transparent_70%)] animate-[pulse_4s_ease-in-out_infinite]" />
          <div
            className="group relative h-[440px] w-[340px] before:content-[''] before:absolute before:inset-[-2px] before:bg-[linear-gradient(135deg,var(--sky),transparent_40%,var(--crystal)_60%,transparent)] before:[border-radius:50%_50%_50%_50%_/_60%_60%_40%_40%] before:z-0 before:animate-[rotateBorder_8s_linear_infinite] after:content-[''] after:absolute after:inset-[3px] after:bg-white after:[border-radius:50%_50%_50%_50%_/_60%_60%_40%_40%] after:z-[1]"
          >
            <div className="absolute inset-[3px] z-[2] overflow-hidden bg-[linear-gradient(160deg,var(--ice)_0%,var(--sky)_100%)] [border-radius:50%_50%_50%_50%_/_60%_60%_40%_40%]">
              {!heroImageFailed ? (
                <Image
                  src="https://i0c.cc/r/g/IGCyukira/IGCyukira/refs/heads/main/img/IGCrystal_Edit_EyE_2_nobg.webp"
                  alt="IGCyukira"
                  fill
                  priority
                  sizes="340px"
                  className="object-cover object-[center_top] origin-center transform-gpu [backface-visibility:hidden] [will-change:transform] saturate-[0.92] brightness-[1.04] transition duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:saturate-100 group-hover:brightness-[1.06]"
                  onError={() => setHeroImageFailed(true)}
                />
              ) : null}
            </div>

            <span className="absolute right-[-10%] top-[5%] z-10 rounded-[30px] border border-[rgba(184,223,245,0.5)] bg-white/90 px-4 py-1.5 font-brandMono text-[0.6rem] tracking-[0.15em] text-[color:var(--deep)] backdrop-blur-[8px] animate-[floatTag_6s_ease-in-out_infinite] [animation-delay:0s]">
              IGCyukira
            </span>
            <span className="absolute bottom-[15%] left-[-15%] z-10 rounded-[30px] border border-[rgba(184,223,245,0.5)] bg-white/90 px-4 py-1.5 font-brandMono text-[0.6rem] tracking-[0.15em] text-[color:var(--deep)] backdrop-blur-[8px] animate-[floatTag_6s_ease-in-out_infinite] [animation-delay:-2s]">
              Pure / Rational
            </span>
            <span className="absolute right-[-20%] top-[40%] z-10 rounded-[30px] border border-[rgba(184,223,245,0.5)] bg-white/90 px-4 py-1.5 font-brandMono text-[0.6rem] tracking-[0.15em] text-[color:var(--deep)] backdrop-blur-[8px] animate-[floatTag_6s_ease-in-out_infinite] [animation-delay:-4s]">
              IGCrystal
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[calc(6rem+env(safe-area-inset-bottom))] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0 animate-[fadeIn_1s_2s_forwards]">
        <span className="font-brandMono text-[0.55rem] tracking-[0.3em] text-[color:var(--text-muted)] uppercase">
          Scroll
        </span>
        <div className="h-[50px] w-px bg-[linear-gradient(to_bottom,var(--crystal),transparent)] animate-[scrollLine_2s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}
