"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const PrismaticBurst = dynamic(() => import("@/components/ui/PrismaticBurst"), { ssr: false });

export type TerminalSectionProps = {
  lines?: string[];
  typingSpeedMs?: number;
  className?: string;
  id?: string;
  username?: string;
  hostname?: string;
};

const defaultLines = [
  ":)",
  "",
  "ViaLonga, Somniviva",
  "",
  "The wind silvers the plain; footprints fade into stars. Shadows stack like old dreams.",
  "",
  "Fog coils at the ankles like half-woken thoughts. Dawn thins the dark; dew-laced stone flickers cold.",
  "The air tastes of grass and earth, a low hum of hills and water. Shadows pull long—time unspools in",
  "silence, then vanishes at an unseen end. A single bird-call reminds: there are roads unwalked,",
  "dreams unawakened. Heartbeat keeps time with steps. With every breath, a slope is climbed; with",
  "every lift of the eyes, a farther horizon appears. The road is long; the dream stays.",
];

export default function TerminalSection({
  lines = defaultLines,
  typingSpeedMs = 30,
  className,
  id = "terminal",
  username = "user",
  hostname,
}: TerminalSectionProps) {
  const COMMANDS = ["help", "others", "about", "clear", "remove all"] as const;
  const INPUT_MAX_CHARS = COMMANDS.reduce((max, cmd) => Math.max(max, cmd.length), 0);
  const [output, setOutput] = useState<string>("");
  const [typingDone, setTypingDone] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState<boolean>(false);
  const contentRef = useRef<string>("");
  const timeoutRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState<string>("");
  const [entries, setEntries] = useState<Array<React.ReactNode>>([]);
  const [isGlitch, setIsGlitch] = useState<boolean>(false);
  const idxRef = useRef<number>(0);
  const bufferRef = useRef<string>("");
  const [hostLabel, setHostLabel] = useState<string>("");
  const [pendingConfirm, setPendingConfirm] = useState<null | "lockdown">(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        setInView(e.isIntersecting && e.intersectionRatio >= 0.35);
      },
      { threshold: [0, 0.35, 0.75, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    contentRef.current = lines.join("\n") + "\n";
    idxRef.current = 0;
    bufferRef.current = "";
    const id = window.setTimeout(() => {
      setOutput("");
      setTypingDone(false);
    }, 0);
    return () => window.clearTimeout(id);
  }, [lines]);

  useEffect(() => {
    const tick = () => {
      const all = contentRef.current;
      const nextChar = all[idxRef.current];
      if (nextChar === undefined) {
        setTypingDone(true);
        timeoutRef.current = null;
        return;
      }
      bufferRef.current += nextChar;
      idxRef.current += 1;
      setOutput(bufferRef.current);
      timeoutRef.current = window.setTimeout(tick, typingSpeedMs);
    };

    if (inView && !typingDone && timeoutRef.current === null) {
      timeoutRef.current = window.setTimeout(tick, typingSpeedMs);
    }
    if (!inView && timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [inView, typingDone, typingSpeedMs]);

  useEffect(() => {
    if (typingDone && inView && inputRef.current) {
      inputRef.current.focus();
    }
  }, [typingDone, inView]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = window.setTimeout(() => {
        setHostLabel(window.location.hostname || "");
      }, 0);
      return () => window.clearTimeout(id);
    }
  }, []);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;

    // Auto-grow to fit wrapped lines.
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [input, typingDone]);

  const pushEntry = (node: React.ReactNode) => {
    setEntries((prev) => [...prev, node]);
  };

  const skipTyping = () => {
    if (typingDone) return;
    try {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      const full = contentRef.current;
      bufferRef.current = full;
      idxRef.current = full.length;
      setOutput(full);
      setTypingDone(true);
    } catch {}
  };

  const LINKS = [
    { label: "Blog", href: "https://blog.igcrystal.icu" },
    { label: "GitHub", href: "https://github.com/IGCrystal" },
    { label: "Bilibili", href: "https://space.bilibili.com/523637242" },
    { label: "X (Twitter)", href: "https://x.com/Cedar2352" },
  ];

  const renderLinks = () => (
    <>
      {LINKS.map((l, i) => (
        <div key={l.href}>
          {i + 1}. <a className="underline decoration-dotted hover:opacity-90" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
        </div>
      ))}
    </>
  );

  const handleCommand = (cmdRaw: string) => {
    const cmd = cmdRaw.trim().replace(/\s+/g, " ").toLowerCase();
    if (!cmd) return;
    switch (cmd) {
      case "help": {
        pushEntry(
          <div>
            Available commands: <span className="text-emerald-400">help</span>, <span className="text-emerald-400">others</span>, <span className="text-emerald-400">about</span>, <span className="text-emerald-400">clear</span>, <span className="text-emerald-400">remove all</span>
          </div>
        );
        break;
      }
      case "others":
        pushEntry(renderLinks());
        break;
      case "about":
        pushEntry(
          <div>
            <div>ViaLonga · Somniviva — building quiet, long roads and bright dreams.</div>
            <div className="mt-2">
              Learn about{" "}
              <Link className="underline decoration-dotted hover:opacity-90" href="/igcyukira">
                IGCrystal
              </Link>
            </div>
          </div>
        );
        break;
      case "clear":
        setEntries([]);
        break;
      case "remove all": {
        pushEntry(
          <div className="text-red-400">
            This operation will crash the system. Continue? [y/N]
          </div>
        );
        setPendingConfirm("lockdown");
        break;
      }
      default:
        pushEntry(<div>command not found: {cmd}</div>);
    }
  };

  const handleConfirm = (answerRaw: string) => {
    const answer = answerRaw.trim().toLowerCase();
    const yes = answer === "y" || answer === "yes";
    if (pendingConfirm === "lockdown") {
      if (yes) {
        setIsGlitch(true);
        pushEntry(
          <div className="text-red-500">
            removing core modules... system halt.
          </div>
        );
        window.setTimeout(() => {
          try {
            const pause = new Event("pause-audio");
            window.dispatchEvent(pause);
            const ev = new Event("site-lockdown:enable");
            window.dispatchEvent(ev);
          } catch {}
          setIsGlitch(false);
        }, 1400);
      } else {
        pushEntry(<div className="text-white/70">aborted.</div>);
      }
    }
    setPendingConfirm(null);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!typingDone) return;
    const { key } = e;
    if (key === "Enter") {
      e.preventDefault();
      if (pendingConfirm) {
        handleConfirm(input);
      } else {
        handleCommand(input);
      }
      setInput("");
      return;
    }
  };

  const isTitleLine = (s: string) => {
    const t = s.trim();
    return t === "ViaLonga, Somniviva" || t === "ViaLonga, Somniviva.";
  };

  const renderTypedOutput = () => {
    const parts = output.split("\n");
    return parts.map((line, i) => (
      <span
        key={i}
        className={isTitleLine(line) ? "text-2xl sm:text-3xl md:text-4xl leading-tight" : undefined}
      >
        {line}
        {i < parts.length - 1 ? "\n" : ""}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id={id}
      className={`relative snap-section overflow-hidden snap-start min-h-[100svh] min-h-[100dvh] min-h-[var(--app-height)] w-full bg-black text-white flex items-center justify-center px-6 py-10 ${isGlitch ? "animate-pulse" : ""} ${className ?? ""}`}
      onClick={() => { try { inputRef.current?.focus(); } catch {} }}
      onKeyDown={(e) => {
        if (!typingDone) {
          const k = e.key;
          if (!["Shift", "Control", "Alt", "Meta"].includes(k)) {
            e.preventDefault();
            skipTyping();
            requestAnimationFrame(() => { try { inputRef.current?.focus(); } catch {} });
          }
        }
      }}
      tabIndex={-1}
    >
      {/* backgrounds: mobile uses original blobs, desktop uses prismatic burst */}
      {/* Mobile/Small screens: original blurry blobs */}
      <div className="pointer-events-none absolute inset-0 z-0 md:hidden">
        <div className="blob-animate-1 absolute -top-24 -left-24 h-80 w-80 rounded-full bg-sky-400/40 blur-3xl mix-blend-screen" />
        <div className="blob-animate-2 absolute top-1/3 -right-16 h-96 w-96 rounded-full bg-fuchsia-400/35 blur-3xl mix-blend-screen" />
        <div className="blob-animate-3 absolute bottom-[-10%] left-1/4 h-[28rem] w-[28rem] rounded-full bg-emerald-400/30 blur-[72px] mix-blend-screen" />
      </div>

      {/* Desktop and up: Prismatic Burst */}
      <div className="pointer-events-auto absolute inset-0 z-0 hidden md:block" aria-hidden>
        <PrismaticBurst
          intensity={1.6}
          speed={0.55}
          animationType="rotate3d"
          distort={2}
          rayCount={20}
          mixBlendMode="screen"
          paused={!inView}
        />
      </div>

      <div className="terminal-font w-full max-w-5xl relative z-10">
        <pre className="whitespace-pre-wrap leading-7 text-[14px] sm:text-[15px] md:text-base first-line:text-6xl sm:first-line:text-7xl md:first-line:text-8xl first-line:leading-none">
{renderTypedOutput()}
{typingDone && entries.length > 0 ? (
  <> 
    {"\n"} 
    {entries.map((n, i) => (<div key={i}>{n}</div>))} 
  </> 
) : null} 
{typingDone ? (
  <> 
    {"\n"} 
    <div className="flex flex-wrap items-start gap-x-0 gap-y-1 break-words max-w-full">
      <span className="text-emerald-400">{username}</span>
      <span>@</span>
      <span className="text-sky-400">{hostname ?? hostLabel}</span>
      <span>:</span>
      <span className="text-blue-400">~</span>
      <span>$ </span>
      <textarea
        ref={inputRef}
        value={input}
        maxLength={INPUT_MAX_CHARS}
        onChange={(e) => setInput(e.target.value.slice(0, INPUT_MAX_CHARS))}
        onKeyDown={onKeyDown}
        aria-label="terminal input"
        inputMode="text"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        rows={1}
        className="outline-none inline-block min-w-[8ch] flex-1 bg-transparent border-0 p-0 m-0 text-inherit resize-none overflow-hidden [overflow-wrap:anywhere]"
      />
    </div>
  </> 
) : (
  <span>|</span>
)}
        </pre>
      </div>
    </section>
  );
}
