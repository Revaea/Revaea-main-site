"use client";

import { useState } from "react";
import { Flower2, Gem, MoonStar } from "lucide-react";

import type { DualityMode } from "@/components/pages/igcyukira/types";

export function DualitySection() {
  const [mode, setMode] = useState<DualityMode>("light");

  return (
    <section id="duality" className="overflow-hidden py-40">
      <div className="mx-auto max-w-[1200px] px-16 max-[900px]:px-8">
        <div className="mb-24 text-center">
          <p className="reveal mb-4 inline-flex items-center justify-center gap-2 font-brandMono text-[0.6rem] tracking-[0.5em] text-[color:var(--crystal)] uppercase">
            <Gem className="h-[14px] w-[14px] shrink-0" aria-hidden="true" /> The Other Self
          </p>
          <h2 className="reveal reveal-delay-1 font-brandDisplay text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.1] text-[color:var(--text-primary)]">
            Light and Darkness
            <br />
            <em className="italic text-[color:var(--deep)]">Two Faces</em>
          </h2>

          <div className="reveal reveal-delay-2 mt-12 flex justify-center">
            <button
              className={`inline-flex items-center justify-center border px-10 py-3 font-brandMono text-[0.65rem] tracking-[0.2em] uppercase transition-all duration-300 ${
                mode === "light"
                  ? "bg-[color:var(--crystal)] border-[color:var(--crystal)] text-white"
                  : "bg-transparent border-[color:var(--sky)] text-[color:var(--text-secondary)]"
              } rounded-l-[30px] border-r-0`}
              type="button"
              onClick={() => setMode("light")}
            >
              <Flower2 className="mr-2 h-[14px] w-[14px]" aria-hidden="true" />
              LyrigCats
            </button>
            <button
              className={`inline-flex items-center justify-center border px-10 py-3 font-brandMono text-[0.65rem] tracking-[0.2em] uppercase transition-all duration-300 ${
                mode === "dark"
                  ? "bg-[color:var(--crystal)] border-[color:var(--crystal)] text-white"
                  : "bg-transparent border-[color:var(--sky)] text-[color:var(--text-secondary)]"
              } rounded-r-[30px]`}
              type="button"
              onClick={() => setMode("dark")}
            >
              <MoonStar className="mr-2 h-[14px] w-[14px]" aria-hidden="true" />
              TragicLys
            </button>
          </div>
        </div>

        <div className="relative grid min-h-[500px]">
          <div
            className={`col-start-1 row-start-1 grid items-center gap-16 transition-opacity duration-700 will-change-[opacity] max-[900px]:grid-cols-1 max-[900px]:gap-10 grid-cols-2 ${
              mode === "light" ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            id="panel-light"
            aria-hidden={mode !== "light"}
          >
            <div className="flex justify-center max-[900px]:hidden">
              <div className="relative flex h-[280px] w-[280px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.9),rgba(184,223,245,0.6),rgba(126,200,227,0.3))] shadow-[0_0_60px_rgba(126,200,227,0.4),0_0_120px_rgba(184,223,245,0.2),inset_0_0_40px_rgba(255,255,255,0.5)]">
                <div className="absolute -inset-5 rounded-full border border-[rgba(184,223,245,0.3)] animate-[spinSlow_20s_linear_infinite] before:content-[''] before:absolute before:inset-[15px] before:rounded-full before:border before:border-dashed before:border-[rgba(126,200,227,0.2)] before:animate-[spinSlow_14s_linear_infinite_reverse]" />
                <div className="text-center font-brandDisplay text-[1.4rem] italic text-[color:var(--deep)]">
                  LyrigCats
                  <br />
                  <small className="font-brandMono text-[0.7em] not-italic tracking-[0.1em] text-[color:var(--deep)]">
                    Lyric Poem
                  </small>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-8 font-brandMono text-[0.6rem] tracking-[0.35em] text-[color:var(--text-muted)] uppercase">
                Reborn Hope
              </p>
              <h3 className="mb-2 font-brandDisplay text-[3rem] font-light leading-none text-[color:var(--deep)]">
                LyrigCats
              </h3>
              <p className="mb-8 text-[0.95rem] leading-[2] text-[color:var(--text-secondary)]">
                An embodiment of lyricism: bright at heart, clear in purpose, and gentle in virtue. The letters resemble IGCrystal, yet the meaning diverges - an optimistic IGCyukira, a different possible self.
              </p>
              <div className="rounded border border-[rgba(184,223,245,0.5)] bg-[rgba(5,13,20,0.04)] p-6 font-brandMono text-[0.7rem] leading-[1.8] text-[color:var(--abyss)]">
                <span className="text-[color:var(--text-muted)]">{"// Ending & Rebirth"}</span>
                <br />
                <span className="text-[color:var(--crystal)]">ending</span> ⟺{" "}
                <span className="text-[color:var(--deep)]">∃Δvars</span> : reboot(hope, Δvars)
                <br />
                reboot(hope, Δvars)
                <br />
                &nbsp;&nbsp;⟹ (tragiclys := <span className="text-[color:var(--deep)]">∅</span>)
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;∧ (igcrystal := <span className="text-[color:var(--deep)]">restored</span>)
              </div>
            </div>
          </div>

          <div
            className={`col-start-1 row-start-1 grid items-center gap-16 transition-opacity duration-700 will-change-[opacity] max-[900px]:grid-cols-1 max-[900px]:gap-10 grid-cols-2 ${
              mode === "dark" ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            id="panel-dark"
            aria-hidden={mode !== "dark"}
          >
            <div className="flex justify-center max-[900px]:hidden">
              <div className="relative flex h-[280px] w-[280px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(30,60,80,0.9),rgba(10,37,53,0.95),rgba(5,13,20,1))] shadow-[0_0_60px_rgba(58,155,191,0.2),0_0_120px_rgba(10,37,53,0.5),inset_0_0_40px_rgba(0,0,0,0.3)]">
                <div className="absolute -inset-5 rounded-full border border-[rgba(58,155,191,0.2)] animate-[spinSlow_20s_linear_infinite] before:content-[''] before:absolute before:inset-[15px] before:rounded-full before:border before:border-dashed before:border-[rgba(126,200,227,0.2)] before:animate-[spinSlow_14s_linear_infinite_reverse]" />
                <div className="text-center font-brandDisplay text-[1.4rem] italic text-[rgba(126,200,227,0.8)]">
                  TragicLys
                  <br />
                  <small className="font-brandMono text-[0.7em] not-italic tracking-[0.1em] text-[rgba(126,200,227,0.6)]">
                    Sorrow Lily
                  </small>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-8 font-brandMono text-[0.6rem] tracking-[0.35em] text-[color:var(--text-muted)] uppercase">
                Eternal Truth
              </p>
              <h3 className="mb-2 font-brandDisplay text-[3rem] font-light leading-none text-[color:var(--abyss)]">
                TragicLys
              </h3>
              <p className="mb-8 text-[0.95rem] leading-[2] text-[color:var(--text-secondary)]">
                A sorrowful lily - symbolizing the other side of IGCyukira: shadowed, bleak, and despairing. The letters are similar yet the meaning is inverted; a solitary counterpart wandering at the edge of existence.
              </p>
              <div className="rounded border border-[rgba(184,223,245,0.5)] bg-[rgba(5,13,20,0.06)] p-6 font-brandMono text-[0.7rem] leading-[1.8] text-[color:var(--abyss)]">
                <span className="text-[color:var(--text-muted)]">{"// The Fallen Ending"}</span>
                <br />
                <span className="text-[color:var(--text-muted)]">{"// When the dark overcomes"}</span>
                <br />
                (igcrystal &lt;= tragiclys)
                <br />
                &nbsp;&nbsp;== <span className="text-[color:var(--deep)]">ending</span>
                <br />
                <br />
                <span className="text-[color:var(--text-muted)]">{"// Overwrite => ending"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
