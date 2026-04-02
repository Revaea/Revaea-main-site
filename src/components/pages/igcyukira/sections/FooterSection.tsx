"use client";

export function FooterSection() {
  return (
    <footer
      id="site-footer"
      className="relative z-[1] pt-24 pb-[calc(6rem+env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto flex max-w-[1200px] items-end justify-between px-16 max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-8 max-[900px]:px-8">
        <div>
          <div className="select-none font-brandDisplay text-[4rem] font-light leading-none tracking-[-0.02em] text-[rgba(184,223,245,0.4)]">
            IGCrystal
          </div>
          <p className="mt-4 font-brandMono text-[0.55rem] tracking-[0.3em] text-[color:var(--text-muted)]">
            Long Road / Living Dream
          </p>
        </div>
        <div className="text-right max-[900px]:text-left">
          <p className="mt-8 font-brandMono text-[0.55rem] tracking-[0.2em] text-[rgba(184,223,245,0.5)]">
            Ice Glycoside Crystal / Pure / Rational / Calm
          </p>
        </div>
      </div>
    </footer>
  );
}
