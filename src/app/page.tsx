import Link from "next/link";
import Image from "next/image";
import { Feather, Sparkles, Heart, Users, Wand2, Music, Coffee, BookOpen, Palette, Share2, MoonStar, Gem, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import BlurText from "@/components/ui/BlurText";
import BackgroundWithMask from "@/components/ui/BackgroundWithMask";
import GlassReveal from "@/components/ui/GlassReveal";
import SparklesText from "@/components/ui/SparklesText";

export default function Home() {
  return (
    <main className="relative">
      {/* Full-screen background */}
      <BackgroundWithMask 
        magnetLinesProps={{
          rows: 18,
          columns: 18,
          lineColor: '#94a3b8',
          lineWidth: '0.6vmin',
          lineHeight: '3vmin',
          baseAngle: -8
        }}
        maskOpacity={0.85}
        enableBlur={false}
      />
      
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center justify-center z-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-8 pb-16 md:pt-12 md:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 lg:gap-4 items-center">
            <div className="max-w-3xl lg:text-right w-full lg:w-auto mt-6 lg:mt-0 lg:ml-auto lg:mr-16 lg:pr-4">
                <h1 className="font-sans text-4xl/tight sm:text-4xl/tight md:text-5xl/tight lg:text-6xl/tight font-semibold tracking-tight text-center lg:text-right">
                  <BlurText as="span" text="Revaea" animateBy="letters" />
                  <BlurText as="span" className="block text-brand" text="Understanding, Inclusion, Kindness" animateBy="words" />
                </h1>
                <BlurText
                  as="p"
                  className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-7 text-muted text-center lg:text-right"
                  text="When winds rise, petals scatter; when rain falls, rainbows appear. Meetings and partings are fleeting—yet always for rebirth."
                  animateBy="words"
                  delay={100}
                />
                <div className="mt-5 md:mt-8 flex items-center gap-6">
                  <GlassReveal delayMs={100}>
                    <Link href="https://github.com/Revaea" className="inline-flex h-11 items-center px-6 text-sm font-medium text-brand-foreground bg-brand rounded-md shadow hover:opacity-90 transition-all">
                      Reavea
                    </Link>
                  </GlassReveal>
                  <GlassReveal delayMs={250}>
                    <Link href="https://github.com/Neo-Revaea" className="inline-flex h-11 items-center px-6 text-sm font-medium border rounded-md hover:bg-black/[.04] dark:hover:bg-white/[.06] transition-all">
                      Neo-Revaea
                    </Link>
                  </GlassReveal>
                </div>
                
                <div className="mt-4 md:mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-6 text-xs text-muted-foreground">
                  <div>
                    <Link
                      href="https://IGCrystal.icu"
                      className="inline-flex items-center gap-1.5 text-brand hover:text-brand/90 underline underline-offset-4 decoration-brand/60 transition-colors group"
                    >
                        <BlurText as="span" text="IGCrystal" animateBy="letters" stepDuration={0.25} />
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/bayhyn"
                      className="inline-flex items-center gap-1.5 text-brand hover:text-brand/90 underline underline-offset-4 decoration-brand/60 transition-colors group"
                    >
                        <BlurText as="span" text="BayHyn" animateBy="letters" stepDuration={0.25} />
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/xirayu"
                      className="inline-flex items-center gap-1.5 text-brand hover:text-brand/90 underline underline-offset-4 decoration-brand/60 transition-colors group"
                    >
                        <BlurText as="span" text="Xirayu" animateBy="letters" stepDuration={0.25} />
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="https://github.com/Tianzelle"
                      className="inline-flex items-center gap-1.5 text-brand hover:text-brand/90 underline underline-offset-4 decoration-brand/60 transition-colors group"
                    >
                        <BlurText as="span" text="Tianzelle" animateBy="letters" stepDuration={0.25} />
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="https://github.com/Lucodia"
                      className="inline-flex items-center gap-1.5 text-brand hover:text-brand/90 underline underline-offset-4 decoration-brand/60 transition-colors group"
                    >
                        <BlurText as="span" text="Lucodia" animateBy="letters" stepDuration={0.25} />
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>

              </div>
            <div className="flex justify-start relative lg:-ml-8">
              <div className="absolute inset-0 pointer-events-none select-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] bg-brand/20 dark:bg-brand/10 rounded-full blur-3xl opacity-30" />
              </div>
              <GlassReveal className="relative z-10 flex items-center" delayMs={200} rounded="rounded-2xl lg:rounded-3xl">
                <Image 
                  src="/revaea-2.webp"
                  alt="Revaea" 
                  width={500}
                  height={500}
                  className="w-auto h-auto max-h-[300px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[500px] object-contain select-none"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdQIvw4B6jQAAAABJRU5ErkJggg=="
                />
              </GlassReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Overview + Title */}
      <Reveal>
        <section id="overview" className="py-10 relative z-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-3">
              <Feather className="h-10 w-10 text-brand flex-none self-center" />
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">
                  <SparklesText
                    as="span"
                    text="A World Woven by Will"
                    sparklesCount={8}
                    className="inline-block"
                    textClassName="text-current"
                    colors={{ first: "#38bdf8", second: "#0794d5ff" }}
                  />
                </h2>

                <p className="mt-2 text-sm text-muted italic">Woven by Will, Lit by Peace</p>
              </div>
            </div>

            <div
              className="mt-4 h-[2px] w-full bg-blue-500 dark:bg-blue-500" 
            />
          </div>
        </section>
      </Reveal>

      {/* World overview */}
      <Reveal delayMs={80}>
        <section className="py-6 relative z-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-semibold tracking-tight flex items-center gap-2"><Sparkles className="h-5 w-5 text-brand" />World Overview</h3>
            <div className="mt-3 space-y-3 text-[15px] leading-7 text-muted pl-4">
              <p>Revaea is a magical world built upon will and intention. Here, reality is not upheld by physical laws, but woven by the shared resolve of individuals and communities: the stronger the belief, the clearer the world becomes. Imagination, wishes—even dreams—can cast themselves into living, tangible forms.</p>
              <p>Its civilization wears a medieval silhouette—Gothic spires, floating isles, stone streets, and pastoral villages. Yet beneath that gentle surface lies a highly developed magical technology, centered on what locals call “Heartflow Resonance.”</p>
              <p>There is no internet, but there are “Thought-Conduction Arrays” that let hearts speak across distance. There are no aircraft, but “Spiritwind Stones” can carry you freely through the sky.</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Core theme */}
      <Reveal delayMs={120}>
        <section className="py-6 relative z-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-semibold tracking-tight flex items-center gap-2"><Heart className="h-5 w-5 text-brand" />Core Theme</h3>
            <div className="mt-3 space-y-3 text-[15px] leading-7 text-muted pl-4">
              <p>Revaea does not glorify war, and it has no faction defined as “evil.” Instead, it is an ongoing experiment in spirit and order—a sustained exploration of what harmony could look like.</p>
              <p>Every life is encouraged to return to its truest self. Through meditation, creation, and conversation, people resonate with the world—and in this place, the mind is the truth.</p>
              <p>Everything is a “reflection of the heart.” The purer the emotion, the deeper its influence on reality: anger can summon storms, and love can awaken sleeping stars.</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Society */}
      <Reveal delayMs={160}>
        <section id="cases" className="py-6 relative z-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-semibold tracking-tight flex items-center gap-2"><Users className="h-5 w-5 text-brand" />Society</h3>
            <p className="mt-3 text-[15px] leading-7 text-muted pl-4">Revaea’s social structure is loose and free—there are almost no traditional nations or governments. Instead, life gathers into communities known as “Dream Circles.”</p>
            <p className="mt-3 text-[15px] leading-7 text-muted pl-4">Dream Circles form naturally among people with shared ideals and resonant intentions. They remain independent yet cooperate and support one another. Between them there is no rule—only resonance and response.</p>
            <div className="mt-4 space-y-2 text-[15px] leading-7 pl-4">
              <div className="text-muted">Common Dream Circles include—</div>
              <ul className="space-y-2 text-muted">
                <li className="flex items-start gap-2"><Coffee className="h-4 w-4 mt-1 text-brand" /><span><span className="font-medium">Serene Tea Circle</span>: a retreat community centered on spiritual healing and tea meditation.</span></li>
                <li className="flex items-start gap-2"><BookOpen className="h-4 w-4 mt-1 text-brand" /><span><span className="font-medium">Memory Library</span>: an archive that preserves each resident’s inner visions and lived experiences.</span></li>
                <li className="flex items-start gap-2"><Palette className="h-4 w-4 mt-1 text-brand" /><span><span className="font-medium">Illusion Garden</span>: artists paint with intention, and their works become semi-real spaces.</span></li>
              </ul>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Magic system */}
      <Reveal delayMs={200}>
        <section id="faq" className="py-6 relative z-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-semibold tracking-tight flex items-center gap-2"><Wand2 className="h-5 w-5 text-brand" />Magic System: Mindcraft</h3>
            <p className="mt-3 text-[15px] leading-7 text-muted pl-4">Magic in Revaea is not the control of external forces, but the manifestation of one’s inner spirit. Power comes from understanding, not conquest.</p>
            <ul className="mt-3 space-y-2 text-[15px] leading-7 text-muted pl-4">
              <li className="flex items-start gap-2"><Sparkles className="h-4 w-4 mt-1 text-brand" />Manifestation: give form to thoughts, shaped jointly by emotion and understanding.</li>
              <li className="flex items-start gap-2"><Share2 className="h-4 w-4 mt-1 text-brand" />Resonance Circuits: link multiple minds into a shared thinking loop for true group coordination.</li>
              <li className="flex items-start gap-2"><MoonStar className="h-4 w-4 mt-1 text-brand" />Dreamweaving: build spaces in dreams, then anchor them into reality through starlight.</li>
              <li className="flex items-start gap-2"><Gem className="h-4 w-4 mt-1 text-brand" />Temperate Artifacts: heartcrystal-driven magitech that values stability, gentleness, and beauty.</li>
            </ul>
          </div>
        </section>
      </Reveal>

      {/* Tone & style */}
      <Reveal delayMs={240}>
        <section id="style" className="py-6 relative z-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-2"><Music className="h-5 w-5 text-brand" />Tone & Style</h3>
            <p className="mt-3 text-[15px] leading-7 text-muted pl-4">Revaea is like a long poem with no dark chapter. The world moves slowly and gently: floating hot springs at dawn, spirit-song gatherings under starry nights, and the quiet footsteps of catfolk and travelers along silver-vine flower streets.</p>
            <p className="mt-3 text-[15px] leading-7 text-muted pl-4">All fierce conflicts are long past. What remains is a world that breathes—slowly healing and mending itself.</p>
            <p className="mt-3 text-[15px] leading-7 text-muted pl-4">Like a living being with a soul, it answers—quietly, tenderly—every heart that has ever been lost.</p>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
