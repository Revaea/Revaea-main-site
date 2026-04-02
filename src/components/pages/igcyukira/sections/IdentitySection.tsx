"use client";

import { Flower2, Gem, MoonStar, Snowflake } from "lucide-react";

export function IdentitySection() {
  return (
    <section id="identity" className="py-48 pb-32">
      <div className="mx-auto max-w-[1200px] px-16 max-[900px]:px-8">
        <p className="reveal mb-4 inline-flex items-center gap-2 font-brandMono text-[0.6rem] tracking-[0.5em] text-[color:var(--crystal)] uppercase">
          <Gem className="h-[14px] w-[14px] shrink-0" aria-hidden="true" /> Naming System
        </p>
        <h2 className="reveal reveal-delay-1 font-brandDisplay text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.1] text-[color:var(--text-primary)]">
          Name and
          <br />
          <em className="italic text-[color:var(--deep)]">Self System</em>
        </h2>

        <div className="mt-20 grid grid-cols-[1fr_2fr] items-start gap-32 max-[900px]:grid-cols-1 max-[900px]:gap-12">
          <div className="reveal sticky top-[30vh] max-[900px]:static">
            <div className="mb-4 font-brandDisplay text-[8rem] leading-[0.5] text-[color:var(--sky)]">
              &ldquo;
            </div>
            <p className="font-brandSerif text-[1.05rem] font-light leading-[2] text-[color:var(--text-primary)]">
              A crystallization of<br />purity, reason, and<br />the will of light.
            </p>
            <p className="mt-6 font-brandMono text-[0.6rem] tracking-[0.3em] text-[color:var(--text-muted)]">
              Name Meaning / IGCrystal
            </p>
          </div>

          <div className="grid gap-6">
            <div className="name-card reveal reveal-delay-1 relative overflow-hidden rounded-sm border border-[rgba(184,223,245,0.4)] bg-white/70 p-8 backdrop-blur-[4px] transition-[border-color,transform] duration-300 hover:translate-x-1 hover:border-[rgba(126,200,227,0.7)] before:content-[''] before:absolute before:left-0 before:top-0 before:h-0 before:w-[3px] before:bg-[linear-gradient(to_bottom,var(--crystal),var(--sky))] before:transition-[height] before:duration-300 hover:before:h-full">
              <p className="mb-3 inline-flex items-center gap-2 font-brandMono text-[0.55rem] tracking-[0.4em] text-[color:var(--crystal)] uppercase">
                <Snowflake className="h-[14px] w-[14px] shrink-0" aria-hidden="true" />
                English System
              </p>
              <p className="mb-2 font-brandDisplay text-[1.8rem] font-normal leading-[1.2] text-[color:var(--text-primary)]">
                Ice Glycoside Crystal
              </p>
              <p className="mb-3 font-brandMono text-[0.65rem] tracking-[0.1em] text-[color:var(--text-muted)]">
                IGCrystal &nbsp;/&nbsp; IGC
              </p>
              <p className="text-[0.85rem] leading-[1.8] text-[color:var(--text-secondary)]">
                The official English rendering. In-lore, it is the &quot;husk&quot; of IGCyukira - used for codenames, documents, and visual presentation.
              </p>
            </div>

            <div className="name-card reveal reveal-delay-2 relative overflow-hidden rounded-sm border border-[rgba(184,223,245,0.4)] bg-white/70 p-8 backdrop-blur-[4px] transition-[border-color,transform] duration-300 hover:translate-x-1 hover:border-[rgba(126,200,227,0.7)] before:content-[''] before:absolute before:left-0 before:top-0 before:h-0 before:w-[3px] before:bg-[linear-gradient(to_bottom,var(--crystal),var(--sky))] before:transition-[height] before:duration-300 hover:before:h-full">
              <p className="mb-3 inline-flex items-center gap-2 font-brandMono text-[0.55rem] tracking-[0.4em] text-[color:var(--crystal)] uppercase">
                <Flower2 className="h-[14px] w-[14px] shrink-0" aria-hidden="true" />
                Japanese System · External · Outgoing
              </p>
              <p className="mb-2 font-brandDisplay text-[1.8rem] font-normal leading-[1.2] text-[color:var(--text-primary)]">
                IGCyukira
              </p>
              <p className="mb-3 font-brandMono text-[0.65rem] tracking-[0.1em] text-[color:var(--text-muted)]">
                IGCrystal + Yukira &nbsp;/&nbsp; yuki + ra
              </p>
              <p className="text-[0.85rem] leading-[1.8] text-[color:var(--text-secondary)]">
                A poetic nickname form - an outgoing, lively persona with a softer and more open way of self-expression. In the Japanese naming system, it corresponds to the personified core of &quot;Snow Glycoside Crystal&quot;.
              </p>
            </div>

            <div className="name-card reveal reveal-delay-3 relative overflow-hidden rounded-sm border border-[rgba(184,223,245,0.4)] bg-white/70 p-8 backdrop-blur-[4px] transition-[border-color,transform] duration-300 hover:translate-x-1 hover:border-[rgba(126,200,227,0.7)] before:content-[''] before:absolute before:left-0 before:top-0 before:h-0 before:w-[3px] before:bg-[linear-gradient(to_bottom,var(--crystal),var(--sky))] before:transition-[height] before:duration-300 hover:before:h-full">
              <p className="mb-3 inline-flex items-center gap-2 font-brandMono text-[0.55rem] tracking-[0.4em] text-[color:var(--crystal)] uppercase">
                <MoonStar className="h-[14px] w-[14px] shrink-0" aria-hidden="true" />
                Japanese System · Internal · Introverted
              </p>
              <p className="mb-2 font-brandDisplay text-[1.8rem] font-normal leading-[1.2] text-[color:var(--text-primary)]">
                IGCyukito
              </p>
              <p className="mb-3 font-brandMono text-[0.65rem] tracking-[0.1em] text-[color:var(--text-muted)]">
                IGCrystal + Yukito &nbsp;/&nbsp; yuki + to
              </p>
              <p className="text-[0.85rem] leading-[1.8] text-[color:var(--text-secondary)]">
                A gentle, introverted persona - quieter and warmer. A poetic extension of the &quot;snow-sugar crystal&quot; motif, shifting the tone from dreamy softness to cool solemnity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
