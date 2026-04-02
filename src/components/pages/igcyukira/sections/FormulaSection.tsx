"use client";

import {
  Flower2,
  Infinity as InfinityIcon,
  MoonStar,
  RefreshCcw,
  Sigma,
} from "lucide-react";

export function FormulaSection() {
  return (
    <section id="formula" className="py-40 max-[900px]:py-28 max-[520px]:py-24">
      <div className="mx-auto max-w-[1200px] px-16 max-[900px]:px-8 max-[520px]:px-6">
        <p className="reveal mb-4 inline-flex items-center gap-2 font-brandMono text-[0.6rem] tracking-[0.5em] text-[color:var(--crystal)] uppercase">
          <Sigma className="h-[14px] w-[14px] shrink-0" aria-hidden="true" /> Existence Formula
        </p>
        <h2 className="reveal reveal-delay-1 font-brandDisplay text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.1] text-[color:var(--text-primary)]">
          A Spell
          <br />
          <em className="italic text-[color:var(--deep)]">Awaiting Decryption</em>
        </h2>

        <div className="mt-20 grid grid-cols-2 gap-12 max-[900px]:mt-16 max-[900px]:grid-cols-1 max-[900px]:gap-8 max-[520px]:mt-12">
          <div className="formula-card reveal reveal-delay-1 relative overflow-hidden rounded-sm border border-[rgba(184,223,245,0.4)] bg-white/60 p-12 backdrop-blur-[8px] will-change-transform transform-gpu transition-[transform,box-shadow] duration-500 [transition-timing-function:var(--transition,cubic-bezier(0.22,1,0.36,1))] hover:translate-y-[-3px] hover:shadow-[0_20px_60px_rgba(126,200,227,0.15)] before:content-[''] before:absolute before:left-0 before:right-0 before:top-0 before:h-[2px] before:bg-[linear-gradient(90deg,transparent,var(--crystal),transparent)] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 max-[900px]:p-10 max-[520px]:p-7">
            <p className="mb-6 inline-flex items-center gap-2 font-brandMono text-[0.55rem] tracking-[0.4em] text-[color:var(--crystal)] uppercase">
              <Flower2 className="h-[14px] w-[14px] shrink-0" aria-hidden="true" />
              Rebirth Formula · LyrigCats
            </p>
            <div className="mb-6 break-words border-l-2 border-l-[color:var(--crystal)] bg-[rgba(232,244,253,0.4)] p-4 font-brandDisplay text-[1.1rem] italic leading-[2] text-[color:var(--abyss)] max-[520px]:p-3 max-[520px]:text-[1rem] max-[520px]:leading-[1.8]">
              ending ⟺ ∃Δvars : reboot(hope, Δvars)
              <br />
              <br />
              reboot(hope, Δvars)
              <br />
              &nbsp;&nbsp;⟹ (tragiclys := ∅)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;∧ (igcrystal := restored)
            </div>
            <p className="text-[0.85rem] leading-[1.8] text-[color:var(--text-secondary)] max-[520px]:text-[0.8rem]">
              Even at the end, there can still exist variables Δvars that reboot everything into a new beginning. The strength of hope, and of those variables, causes TragicLys to fade, and IGCrystal to be reborn.
            </p>
          </div>

          <div className="formula-card reveal reveal-delay-2 relative overflow-hidden rounded-sm border border-[rgba(184,223,245,0.4)] bg-white/60 p-12 backdrop-blur-[8px] will-change-transform transform-gpu transition-[transform,box-shadow] duration-500 [transition-timing-function:var(--transition,cubic-bezier(0.22,1,0.36,1))] hover:translate-y-[-3px] hover:shadow-[0_20px_60px_rgba(126,200,227,0.15)] before:content-[''] before:absolute before:left-0 before:right-0 before:top-0 before:h-[2px] before:bg-[linear-gradient(90deg,transparent,var(--crystal),transparent)] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 max-[900px]:p-10 max-[520px]:p-7">
            <p className="mb-6 inline-flex items-center gap-2 font-brandMono text-[0.55rem] tracking-[0.4em] text-[color:var(--crystal)] uppercase">
              <MoonStar className="h-[14px] w-[14px] shrink-0" aria-hidden="true" />
              Ending Formula · TragicLys
            </p>
            <div className="mb-6 break-words border-l-2 border-l-[color:var(--crystal)] bg-[rgba(232,244,253,0.4)] p-4 font-brandDisplay text-[1.1rem] italic leading-[2] text-[color:var(--abyss)] max-[520px]:p-3 max-[520px]:text-[1rem] max-[520px]:leading-[1.8]">
              (igcrystal ≤ tragiclys)
              <br />
              <br />
              &nbsp;&nbsp;== ending
              <br />
              <br />
              &nbsp;&nbsp;{"// overwrite => ending"}
            </div>
            <p className="text-[0.85rem] leading-[1.8] text-[color:var(--text-secondary)] max-[520px]:text-[0.8rem]">
              Under certain conditions, IGCyukira can be overwritten or influenced by TragicLys. When that relation holds, it triggers the ending in the story or worldview. Will it fall - or fight back?
            </p>
          </div>

          <div className="formula-card reveal reveal-delay-3 relative col-span-2 overflow-hidden rounded-sm border border-[rgba(184,223,245,0.4)] bg-white/60 p-12 backdrop-blur-[8px] will-change-transform transform-gpu transition-[transform,box-shadow] duration-500 [transition-timing-function:var(--transition,cubic-bezier(0.22,1,0.36,1))] hover:translate-y-[-3px] hover:shadow-[0_20px_60px_rgba(126,200,227,0.15)] before:content-[''] before:absolute before:left-0 before:right-0 before:top-0 before:h-[2px] before:bg-[linear-gradient(90deg,transparent,var(--crystal),transparent)] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 max-[900px]:col-span-1 max-[900px]:p-10 max-[520px]:p-7">
            <p className="mb-6 inline-flex items-center gap-2 font-brandMono text-[0.55rem] tracking-[0.4em] text-[color:var(--crystal)] uppercase">
              <InfinityIcon className="h-[14px] w-[14px] shrink-0" aria-hidden="true" />
              The Cycle · Universal Truth
            </p>
            <div className="mb-6 grid grid-cols-[1fr_auto_1fr] items-center gap-8 break-words border-l-2 border-l-[color:var(--crystal)] bg-[rgba(232,244,253,0.4)] p-4 text-center font-brandDisplay text-[1.1rem] italic leading-[2] text-[color:var(--abyss)] max-[520px]:grid-cols-1 max-[520px]:gap-4 max-[520px]:p-3 max-[520px]:text-[1rem] max-[520px]:leading-[1.8]">
              <span>
                LyrigCats
                <br />
                <small className="font-brandMono text-[0.7em] not-italic text-[color:var(--text-muted)]">
                  Light · Hope · Reborn
                </small>
              </span>
              <span className="text-[color:var(--crystal)] max-[520px]:flex max-[520px]:justify-center">
                <RefreshCcw
                  className="inline-block h-[30px] w-[30px] max-[520px]:h-[26px] max-[520px]:w-[26px]"
                  aria-hidden="true"
                />
              </span>
              <span>
                TragicLys
                <br />
                <small className="font-brandMono text-[0.7em] not-italic text-[color:var(--text-muted)]">
                  Darkness · Despair · Ending
                </small>
              </span>
            </div>
            <p className="text-center text-[0.85rem] leading-[1.8] text-[color:var(--text-secondary)] max-[520px]:text-[0.8rem]">
              Both are mirror projections of IGCrystal, alternating within an eternal cycle.
              <br />
              <em className="text-[color:var(--deep)]">
                Existence itself is endless choice and iteration between light and darkness.
              </em>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
