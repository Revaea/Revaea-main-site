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
      {/* 全屏背景 */}
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
                <h1 className="font-sans text-5xl/tight sm:text-5xl/tight md:text-5xl/tight lg:text-7xl/tight font-semibold tracking-tight text-center lg:text-right">
                  <BlurText as="span" text="Revaea" animateBy="letters" />
                  <BlurText as="span" className="block text-brand" text="理解, 包容, 友善" animateBy="words" />
                </h1>
                <BlurText
                  as="p"
                  className="mt-6 text-xl leading-8 text-muted text-center lg:text-right"
                  text="风来碎花去 雨飘长虹显 聚散无常 但为新生"
                  animateBy="words"
                  delay={100}
                />
                <div className="mt-8 flex items-center gap-6">
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
                
                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-6 text-xs text-muted-foreground">
                  <div>
                    <Link
                      href="https://IGCrystal.icu"
                      className="inline-flex items-center gap-1.5 text-brand hover:text-brand/90 underline underline-offset-4 decoration-brand/60 transition-colors group"
                    >
                        <BlurText as="span" text="冰苷晶" animateBy="letters" stepDuration={0.25} />
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/bayhyn"
                      className="inline-flex items-center gap-1.5 text-brand hover:text-brand/90 underline underline-offset-4 decoration-brand/60 transition-colors group"
                    >
                        <BlurText as="span" text="白湖婲" animateBy="letters" stepDuration={0.25} />
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/xirayu"
                      className="inline-flex items-center gap-1.5 text-brand hover:text-brand/90 underline underline-offset-4 decoration-brand/60 transition-colors group"
                    >
                        <BlurText as="span" text="溪忘雨" animateBy="letters" stepDuration={0.25} />
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="https://github.com/Tianzelle"
                      className="inline-flex items-center gap-1.5 text-brand hover:text-brand/90 underline underline-offset-4 decoration-brand/60 transition-colors group"
                    >
                        <BlurText as="span" text="甜则塔" animateBy="letters" stepDuration={0.25} />
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="https://github.com/Lucodia"
                      className="inline-flex items-center gap-1.5 text-brand hover:text-brand/90 underline underline-offset-4 decoration-brand/60 transition-colors group"
                    >
                        <BlurText as="span" text="鹿弥音" animateBy="letters" stepDuration={0.25} />
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
                    text="心念织梦之界"
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

      {/* 世界概述 */}
      <Reveal delayMs={80}>
        <section className="py-6 relative z-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-semibold tracking-tight flex items-center gap-2"><Sparkles className="h-5 w-5 text-brand" />世界概述</h3>
            <div className="mt-3 space-y-3 text-[15px] leading-7 text-muted pl-4">
              <p>Revaea 是一个建立在「心念」之上的魔法世界。在这里，现实并非由物理法则维系，而是由个体与集体的意志共同编织成形；信念愈坚定，世界便愈清晰；想象、愿望，乃至梦境，都可能投影为真实存在。</p>
              <p>文明的外观停留在中世纪的诗意剪影之中：哥特式高塔、浮空群岛、石砖街道与田园村庄。然而，在这温和表象之下，隐藏着以「心流共振」为核心的高度发达魔法技术体系。</p>
              <p>这里没有互联网，却存在“念感传导阵”，使心与心跨越空间交谈；这里没有飞行器，却能借助“灵风石”自由翱翔天际。</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* 世界主旨 */}
      <Reveal delayMs={120}>
        <section className="py-6 relative z-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-semibold tracking-tight flex items-center gap-2"><Heart className="h-5 w-5 text-brand" />世界主旨</h3>
            <div className="mt-3 space-y-3 text-[15px] leading-7 text-muted pl-4">
              <p>Revaea 并不崇尚战争，也不存在被定义为“邪恶”的势力。相反，它更像是一座关于精神与秩序的实验世界，一次对“和谐可能性”的持续探索。</p>
              <p>每一个生命都被鼓励回归真实的自我，通过冥想、创作与交流，与世界产生共振。唯心，即为真理。</p>
              <p>世界的一切皆为“心之映射”，情感越纯粹，其对现实的影响便越深刻：愤怒会引发风暴，而爱，能够唤醒沉睡的星辰。</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* 社会构成 */}
      <Reveal delayMs={160}>
        <section id="cases" className="py-6 relative z-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-semibold tracking-tight flex items-center gap-2"><Users className="h-5 w-5 text-brand" />社会构成</h3>
            <p className="mt-3 text-[15px] leading-7 text-muted pl-4">Revaea 的社会结构松散而自由，几乎不存在传统意义上的国家与政府。取而代之的，是被称为「梦环（Dream Circles）」的生活共同体。</p>
            <p className="mt-3 text-[15px] leading-7 text-muted pl-4">梦环由理念相近、心念共鸣的个体自然形成，彼此独立，却又能够协作互助。它们之间不存在统治关系，只有共振与回应。</p>
            <div className="mt-4 space-y-2 text-[15px] leading-7 pl-4">
              <div className="text-muted">常见的梦环包括——</div>
              <ul className="space-y-2 text-muted">
                <li className="flex items-start gap-2"><Coffee className="h-4 w-4 mt-1 text-brand" /><span><span className="font-medium">净茶梦环</span>：以精神疗愈与茶艺冥想为核心的静修群体。</span></li>
                <li className="flex items-start gap-2"><BookOpen className="h-4 w-4 mt-1 text-brand" /><span><span className="font-medium">记忆图书馆</span>：保存每一位居民心象与经历的精神档案之地。</span></li>
                <li className="flex items-start gap-2"><Palette className="h-4 w-4 mt-1 text-brand" /><span><span className="font-medium">幻绘园</span>：艺术家以念力作画，使作品化为半现实空间。</span></li>
              </ul>
            </div>
          </div>
        </section>
      </Reveal>

      {/* 魔法系统 */}
      <Reveal delayMs={200}>
        <section id="faq" className="py-6 relative z-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-semibold tracking-tight flex items-center gap-2"><Wand2 className="h-5 w-5 text-brand" />魔法系统：意念架构（Mindcraft）</h3>
            <p className="mt-3 text-[15px] leading-7 text-muted pl-4">Revaea 的魔法并非对外力的操控，而是自我精神的显现。力量来源于理解，而非征服。</p>
            <ul className="mt-3 space-y-2 text-[15px] leading-7 text-muted pl-4">
              <li className="flex items-start gap-2"><Sparkles className="h-4 w-4 mt-1 text-brand" />显相术：将想法实体化，其形态由情绪与认知共同决定。</li>
              <li className="flex items-start gap-2"><Share2 className="h-4 w-4 mt-1 text-brand" />念环术：连接多个意识，构建共享思维回路，实现群体协作的“多心一体”。</li>
              <li className="flex items-start gap-2"><MoonStar className="h-4 w-4 mt-1 text-brand" />梦织术：在梦境中构筑空间，并借助星力将其锚定于现实。</li>
              <li className="flex items-start gap-2"><Gem className="h-4 w-4 mt-1 text-brand" />温序魔具：以心晶驱动的魔法机械，强调稳定、温和与美感。</li>
            </ul>
          </div>
        </section>
      </Reveal>

      {/* 风格基调 */}
      <Reveal delayMs={240}>
        <section id="style" className="py-6 relative z-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-2"><Music className="h-5 w-5 text-brand" />风格基调</h3>
            <p className="mt-3 text-[15px] leading-7 text-muted pl-4">Revaea 更像是一首没有黑暗章节的长诗。世界的节奏缓慢而温柔：晨曦中的浮空温泉、星夜下的灵歌集会、猫娘、少女行走于银藤花街的脚步声。</p>
            <p className="mt-3 text-[15px] leading-7 text-muted pl-4">所有激烈的冲突早已成为过去。如今留下的，是一个在自我修复与治愈中缓缓呼吸的世界。</p>
            <p className="mt-3 text-[15px] leading-7 text-muted pl-4">它宛如拥有灵魂的生命体，静静地、温柔地，回应每一颗曾经迷失的心。</p>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
