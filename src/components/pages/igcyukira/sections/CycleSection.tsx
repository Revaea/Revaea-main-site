"use client";

import { Flower2, Hourglass, Leaf, Lightbulb } from "lucide-react";

export function CycleSection() {
  return (
    <section
      id="cycle"
      className="py-40 bg-[linear-gradient(to_bottom,transparent,rgba(232,244,253,0.3)_20%,rgba(232,244,253,0.3)_80%,transparent)]"
    >
      <div className="mx-auto max-w-[1200px] px-16 max-[900px]:px-8">
        <div className="mt-20 grid grid-cols-2 items-center gap-32 max-[900px]:grid-cols-1 max-[900px]:gap-12">
          <div className="reveal relative mx-auto aspect-square w-full max-w-[420px]">
            <svg
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
            >
              <circle
                cx="200"
                cy="200"
                r="170"
                stroke="rgba(184,223,245,0.2)"
                strokeWidth="1"
              />
              <circle
                cx="200"
                cy="200"
                r="130"
                stroke="rgba(184,223,245,0.15)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />

              <circle
                cx="200"
                cy="200"
                r="155"
                stroke="url(#orbitGrad)"
                strokeWidth="1.5"
                strokeDasharray="480 5"
                style={{
                  animation: "spinSlow 30s linear infinite",
                  transformOrigin: "200px 200px",
                }}
              />

              <path
                d="M 200 45 A 155 155 0 0 1 355 200"
                stroke="url(#lightGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 355 200 A 155 155 0 0 1 45 200"
                stroke="url(#darkGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 45 200 A 155 155 0 0 1 200 45"
                stroke="url(#darkGrad2)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              <circle cx="200" cy="200" r="40" fill="url(#centerGrad)" />
              <circle
                cx="200"
                cy="200"
                r="40"
                stroke="rgba(126,200,227,0.4)"
                strokeWidth="1"
              />

              <text
                x="200"
                y="196"
                textAnchor="middle"
                fontFamily="serif"
                fontSize="14"
                fill="#3a9bbf"
                fontStyle="italic"
              >
                IGC
              </text>
              <text
                x="200"
                y="214"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="8"
                fill="#8ab4c8"
                letterSpacing="2"
              >
                CRYSTAL
              </text>

              <circle cx="200" cy="45" r="20" fill="url(#lightNode)" />
              <text
                x="200"
                y="44"
                textAnchor="middle"
                fontSize="9"
                fill="white"
                fontFamily="monospace"
              >
                L
              </text>
              <text
                x="200"
                y="54"
                textAnchor="middle"
                fontSize="7"
                fill="white"
                fontFamily="monospace"
              >
                Lyrig
              </text>

              <circle cx="200" cy="355" r="20" fill="url(#darkNode)" />
              <text
                x="200"
                y="354"
                textAnchor="middle"
                fontSize="9"
                fill="rgba(126,200,227,0.8)"
                fontFamily="monospace"
              >
                T
              </text>
              <text
                x="200"
                y="364"
                textAnchor="middle"
                fontSize="7"
                fill="rgba(126,200,227,0.8)"
                fontFamily="monospace"
              >
                Tragic
              </text>

              <circle
                cx="355"
                cy="200"
                r="14"
                fill="none"
                stroke="rgba(184,223,245,0.6)"
                strokeWidth="1.5"
              />
              <text
                x="355"
                y="197"
                textAnchor="middle"
                fontSize="7"
                fill="var(--text-muted)"
                fontFamily="monospace"
              >
                husk
              </text>
              <text
                x="355"
                y="207"
                textAnchor="middle"
                fontSize="6"
                fill="var(--text-muted)"
                fontFamily="monospace"
              >
                IGC
              </text>

              <circle
                cx="45"
                cy="200"
                r="14"
                fill="none"
                stroke="rgba(184,223,245,0.6)"
                strokeWidth="1.5"
              />
              <text
                x="45"
                y="197"
                textAnchor="middle"
                fontSize="7"
                fill="var(--text-muted)"
                fontFamily="monospace"
              >
                core
              </text>
              <text
                x="45"
                y="207"
                textAnchor="middle"
                fontSize="6"
                fill="var(--text-muted)"
                fontFamily="monospace"
              >
                YUK
              </text>

              <path
                d="M 330 120 L 340 108 L 350 120"
                stroke="rgba(184,223,245,0.5)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 70 280 L 60 292 L 50 280"
                stroke="rgba(184,223,245,0.5)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />

              <circle cx="110" cy="70" r="2" fill="rgba(184,223,245,0.4)" />
              <circle cx="290" cy="330" r="2" fill="rgba(58,155,191,0.3)" />
              <circle cx="330" cy="310" r="1.5" fill="rgba(184,223,245,0.3)" />
              <circle cx="70" cy="90" r="1.5" fill="rgba(184,223,245,0.3)" />

              <defs>
                <linearGradient id="orbitGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(126,200,227,0.6)" />
                  <stop offset="100%" stopColor="rgba(58,155,191,0.1)" />
                </linearGradient>
                <linearGradient
                  id="lightGrad"
                  x1="200"
                  y1="45"
                  x2="355"
                  y2="200"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#b8dff5" />
                  <stop offset="100%" stopColor="#7ec8e3" />
                </linearGradient>
                <linearGradient
                  id="darkGrad"
                  x1="355"
                  y1="200"
                  x2="200"
                  y2="355"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#3a9bbf" />
                  <stop offset="100%" stopColor="#1a5f7a" />
                </linearGradient>
                <linearGradient
                  id="darkGrad2"
                  x1="200"
                  y1="355"
                  x2="45"
                  y2="200"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#1a5f7a" />
                  <stop offset="100%" stopColor="#b8dff5" />
                </linearGradient>
                <radialGradient id="centerGrad" cx="40%" cy="35%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                  <stop offset="100%" stopColor="rgba(232,244,253,0.8)" />
                </radialGradient>
                <radialGradient id="lightNode" cx="40%" cy="35%">
                  <stop offset="0%" stopColor="#b8dff5" />
                  <stop offset="100%" stopColor="#7ec8e3" />
                </radialGradient>
                <radialGradient id="darkNode" cx="40%" cy="35%">
                  <stop offset="0%" stopColor="#1a5f7a" />
                  <stop offset="100%" stopColor="#050d14" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          <div>
            <p className="reveal mb-4 inline-flex items-center gap-2 font-brandMono text-[0.6rem] tracking-[0.5em] text-[color:var(--crystal)] uppercase">
              <Hourglass className="h-[14px] w-[14px] shrink-0" aria-hidden="true" />
              Cycle System
            </p>
            <h2 className="reveal reveal-delay-1 font-brandDisplay text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.1] text-[color:var(--text-primary)]">
              Light and Darkness
              <br />
              <em className="italic text-[color:var(--deep)]">Become a Cycle</em>
            </h2>

            <div className="reveal reveal-delay-1 border-b border-[rgba(184,223,245,0.3)] py-8">
              <p className="mb-2 inline-flex items-center gap-2 font-brandMono text-[0.55rem] tracking-[0.4em] text-[color:var(--crystal)] uppercase">
                <Flower2 className="h-[14px] w-[14px] shrink-0" aria-hidden="true" />
                Life Cycle
              </p>
              <p className="mb-2 font-brandDisplay text-[1.4rem] font-normal text-[color:var(--text-primary)]">
                Life Cycle
              </p>
              <p className="text-[0.85rem] leading-[1.8] text-[color:var(--text-secondary)]">
                Each cycle is a complete life. Light gives rise to darkness, and darkness births light in return - this is the core law of IGCyukira&apos;s existence.
              </p>
            </div>

            <div className="reveal reveal-delay-2 border-b border-[rgba(184,223,245,0.3)] py-8">
              <p className="mb-2 inline-flex items-center gap-2 font-brandMono text-[0.55rem] tracking-[0.4em] text-[color:var(--crystal)] uppercase">
                <Leaf className="h-[14px] w-[14px] shrink-0" aria-hidden="true" />
                Self Iteration
              </p>
              <p className="mb-2 font-brandDisplay text-[1.4rem] font-normal text-[color:var(--text-primary)]">
                Self Iteration
              </p>
              <p className="text-[0.85rem] leading-[1.8] text-[color:var(--text-secondary)]">
                The next cycle may grow stronger - or become more unfortunate. Every rebirth carries fragments of past memories: accumulating through repetition, evolving through recurrence.
              </p>
            </div>

            <div className="reveal reveal-delay-3 py-8">
              <p className="mb-2 inline-flex items-center gap-2 font-brandMono text-[0.55rem] tracking-[0.4em] text-[color:var(--crystal)] uppercase">
                <Lightbulb className="h-[14px] w-[14px] shrink-0" aria-hidden="true" />
                Eternal Truth
              </p>
              <p className="mb-2 font-brandDisplay text-[1.4rem] font-normal text-[color:var(--text-primary)]">
                Eternal Truth
              </p>
              <p className="text-[0.85rem] leading-[1.8] text-[color:var(--text-secondary)]">
                The true ending may be heartbreaking, yet hope can still save those who are lost. Life is never smooth - will you fall, or keep struggling forward?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
