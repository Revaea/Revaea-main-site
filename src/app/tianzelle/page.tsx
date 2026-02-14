"use client";

import "./tianzelle.css";

import StoryScroller from "@/components/ui/StoryScroller";
import SparklesText from "@/components/ui/SparklesText";
import TianzelleShell from "./Tianzelle";

const HERO_TITLE = "One, Two, Three...";

const BLOCKS = [
  {
    text: "Once, there was a little girl. She was a bit clumsy, but she was clumsy in just the right way—a way that made her very, very lovely.",
  },
  {
    text: "When she walked, she would always count her steps.",
  },
  {
    text: "One, two, three... and then, she would suddenly forget where she had left off.",
  },
  {
    text: "She thought about it for a moment, decided that wasn't quite right, and resolved to start counting all over again from one.",
  },
  {
    text: "She felt this was only fair—that every single step deserved to be treated with such earnest care.",
  },
  {
    text: "One day, a cloud fell from the sky.",
  },
  {
    text: "It wasn't a vast, towering cloud, but a tiny, soft one, much like a piece of cotton candy.",
  },
  {
    text: "The little girl looked up for a long time until her neck grew sore, so she sat on the ground and continued to watch.",
  },
  {
    text: "She wondered: If the cloud fell down, would the sky feel cold?",
  },
  {
    text: "Would the sky notice that a little piece of itself was missing?",
  },
  {
    text: "She felt that she ought to help.",
  },
  {
    text: "And so, she picked up the cloud with great care.",
  },
  {
    text: "But the cloud was simply too soft; as soon as she held it, it split into two.",
  },
  {
    text: "Startled, she hurried to whisper an apology, saying she hadn't meant to do it.",
  },
  {
    text: "The cloud wasn't angry. Instead, it slowly and gently drifted back up into the sky, as if nothing had ever happened at all.",
  },
  {
    text: "Only then did the little girl breathe a sigh of relief.",
  },
  {
    text: "She felt she had done a very grand deed that day.",
  },
  {
    text: "Though no one had seen it, surely the sky would remember.",
  },
  {
    text: "On the way home, she accidentally stepped into a puddle.",
  },
  {
    text: "The water splashed up with a bright “Pop!”",
  },
  {
    text: "She froze for a second, then nodded seriously, deciding that the puddle must be saying hello to her.",
  },
  {
    text: "That night, she lay in bed, her head quite empty, yet she wasn't afraid at all.",
  },
  {
    text: "There were so many things she couldn't understand.",
  },
  {
    text: "For instance, why IGCrystal was always surrounded by snowflakes.",
  },
  {
    text: "For instance, why the books of BayHyn were filled with so many words she couldn't read.",
  },
  {
    text: "For instance, why Xirayu always dazed off into space on rainy days.",
  },
  {
    text: "For instance, why clouds could fly, and why the stars never fell down.",
  },
  {
    text: "It was alright that these questions had no answers.",
  },
  {
    text: "Because this was a world where clouds could fall, where puddles said hello, and where everything was treated with earnest care.",
  },
  {
    text: "And she really, truly loved this beautiful world.",
  },
] as const;

export default function TianzellePage() {
  return (
    <TianzelleShell>
      <StoryScroller
        title={HERO_TITLE}
        renderTitle={(title) => (
          <SparklesText
            as="span"
            className="inline-block"
            text={title}
            sparklesCount={20}
            colors={{ first: "#FF69B4", second: "#FFC0CB" }}
          />
        )}
        blocks={[...BLOCKS]}
        label="Realm of Tianzelle"
        labelClassName="block text-xs md:text-sm uppercase tracking-[0.4em] text-rose-500/70 dark:text-rose-200/70 mb-2 md:mb-4 animate-pulse pointer-events-none"
        heroTitleClassName="tz-cute-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-rose-600 dark:text-rose-100 drop-shadow-lg pointer-events-none"
        paragraphClassName="tz-cute-paragraph text-lg md:text-xl lg:text-2xl leading-relaxed font-light text-rose-700/75 dark:text-rose-100/90 drop-shadow-md transition-all duration-700 ease-out"
        progressTrackClassName="absolute bottom-0 left-0 w-full h-px bg-rose-500/15 dark:bg-rose-100/12"
        progressBarClassName="absolute bottom-0 left-0 h-[2px] w-full bg-rose-400 dark:bg-rose-500 shadow-[0_0_14px_rgba(251,113,133,0.55)] dark:shadow-[0_0_12px_rgba(253,164,175,0.35)] origin-left"
      />
    </TianzelleShell>
  );
}
