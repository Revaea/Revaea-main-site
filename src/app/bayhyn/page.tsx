"use client";

import StoryScroller from "@/components/ui/StoryScroller";
import SparklesText from "@/components/ui/SparklesText";
import { useBayHynBackground } from "./BayHyn";

const RAW_CONTENT = [
  { type: "heading", text: "To Learn" },
  { type: "paragraph", text: "I love learning new things." },
  { type: "paragraph", text: "That love isn’t a sudden flare." },
  { type: "paragraph", text: "It isn’t because I’ve always known exactly what I want." },
  { type: "paragraph", text: "Most of the time, it feels like something slowly drawing near—softly, but consistently." },
  { type: "paragraph", text: "The unknown can make me uneasy." },
  { type: "paragraph", text: "And that’s precisely why, when I finally understand even a little, the sense of reality becomes so clear." },
  {
    type: "paragraph",
    text: "For me, learning isn’t about mastering something fast.",
  },
  {
    type: "paragraph",
    text: "It’s about meeting the world again and again, and slowly forming a clearer connection with it.",
  },
  {
    type: "paragraph",
    text: "New things always feel unfamiliar at first—sometimes even clumsy.",
  },
  {
    type: "paragraph",
    text: "They require patience: taking them apart piece by piece.",
  },
  {
    type: "paragraph",
    text: "Concepts collide in my mind—sometimes a tangled mess, sometimes frozen and motionless.",
  },
  {
    type: "paragraph",
    text: "But every attempt quietly changes the way I see things.",
  },
  {
    type: "paragraph",
    text: "Making mistakes doesn’t push me back.",
  },
  {
    type: "paragraph",
    text: "Instead, it shows me where the boundaries are—and places me somewhere real inside understanding.",
  },
  {
    type: "paragraph",
    text: "In that process, time seems to grow quiet.",
  },
  {
    type: "paragraph",
    text: "Attention stretches out, thought settles, and what used to be vague begins to take shape.",
  },
  {
    type: "paragraph",
    text: "The change is subtle, but it’s reassuring—because I can feel myself moving forward, little by little.",
  },
  {
    type: "paragraph",
    text: "I love the moment when I think, “Ah… I understand a bit now.”",
  },
  {
    type: "paragraph",
    text: "It doesn’t make me jump up in excitement.",
  },
  {
    type: "paragraph",
    text: "But it carries a quiet, lasting strength—enough to lead me onward into places that are still uncertain.",
  },
  {
    type: "paragraph",
    text: "In that sense, learning something new feels like a gentle reply to the unknown.",
  },
  {
    type: "paragraph",
    text: "If I look farther ahead, learning begins to show a different shape.",
  },
  {
    type: "paragraph",
    text: "It isn’t always a straight line forward.",
  },
  {
    type: "paragraph",
    text: "Often, it feels like polishing the same stone in the same spot—over and over.",
  },
  {
    type: "paragraph",
    text: "At the beginning, there’s almost no visible change.",
  },
  {
    type: "paragraph",
    text: "Sometimes I even wonder if I’m standing still.",
  },
  {
    type: "paragraph",
    text: "But slowly, the sharp edges soften, and the form becomes clearer.",
  },
  {
    type: "paragraph",
    text: "Real understanding often happens quietly—right in the moments that look like no progress at all.",
  },
  {
    type: "paragraph",
    text: "Understanding is never something completed in one attempt.",
  },
  {
    type: "paragraph",
    text: "Old ideas get overturned.",
  },
  {
    type: "paragraph",
    text: "New structures are built.",
  },
  {
    type: "paragraph",
    text: "And then—again—they are questioned.",
  },
  {
    type: "paragraph",
    text: "Each negation isn’t failure; it’s thought moving closer to what’s true.",
  },
  {
    type: "paragraph",
    text: "Through that repetition, knowledge stops being something I merely remember.",
  },
  {
    type: "paragraph",
    text: "It becomes, slowly, an ability I can actually use.",
  },
  {
    type: "paragraph",
    text: "Learning also lets me see my own gaps more clearly.",
  },
  {
    type: "paragraph",
    text: "The deeper I go, the more I realize how much I still don’t understand.",
  },
  {
    type: "paragraph",
    text: "That can feel unsettling.",
  },
  {
    type: "paragraph",
    text: "But I know it’s also where the next step begins.",
  },
  {
    type: "paragraph",
    text: "Being able to say “I don’t know yet” matters more than rushing to give an answer.",
  },
  {
    type: "paragraph",
    text: "When I stop staring only at results and start caring about the process, the rhythm naturally slows down.",
  },
  {
    type: "paragraph",
    text: "Thinking becomes patient. Understanding becomes steady.",
  },
  {
    type: "paragraph",
    text: "Knowledge is no longer just something I pile up.",
  },
  {
    type: "paragraph",
    text: "It becomes a way of seeing—clearer, gentler—toward problems and toward the world.",
  },
  {
    type: "paragraph",
    text: "And within that kind of learning, the world starts to reveal finer, more real layers.",
  },
  {
    type: "paragraph",
    text: "The unknown stops being only an obstacle.",
  },
  {
    type: "paragraph",
    text: "It becomes something worth approaching—something worth staying with.",
  },
  { type: "paragraph", text: "So I think this must be a beautiful world." },
  { type: "paragraph", text: "Later, I realized it was this slow learning that taught me to trust it." },
  {
    type: "paragraph",
    text: "Not a trust that says everything will go smoothly.",
  },
  {
    type: "paragraph",
    text: "But this: even if I don’t understand, even if I move slowly, the world won’t reject me for that.",
  },
  {
    type: "paragraph",
    text: "It allows me to pause.",
  },
  {
    type: "paragraph",
    text: "It allows me to verify things again and again.",
  },
  {
    type: "paragraph",
    text: "It even allows me to linger in front of the same question for a long time.",
  },
  {
    type: "paragraph",
    text: "Sometimes I suddenly notice I’m looking at something in a different way than before.",
  },
  {
    type: "paragraph",
    text: "That moment isn’t dramatic.",
  },
  {
    type: "paragraph",
    text: "There’s no applause, no clear boundary—just a slight shift, as if the viewpoint quietly moved a little.",
  },
  {
    type: "paragraph",
    text: "And yet that tiny shift makes many old knots feel suddenly holdable.",
  },
  { type: "paragraph", text: "I stop rushing to turn the unknown into an answer." },
  { type: "paragraph", text: "Some questions, if held carefully in the heart, are already enough." },
  { type: "paragraph", text: "Learning teaches me how to wait." },
  {
    type: "paragraph",
    text: "To wait for understanding to take shape.",
  },
  {
    type: "paragraph",
    text: "To wait for thought to find its own landing place.",
  },
  {
    type: "paragraph",
    text: "And to live with uncertainty—not treating it as a flaw, but as proof that the world is still open to me.",
  },
  { type: "paragraph", text: "When I realize that, my mind becomes strangely quiet." },
  { type: "paragraph", text: "Because I know I’m not outside the world, trying to catch up." },
  { type: "paragraph", text: "I’m inside it—walking, learning, and slowly becoming someone who can understand it." },
  { type: "paragraph", text: "And maybe that’s why I feel—" },
  { type: "paragraph", text: "this world is worth treating with patience." },
] as const;

const HERO_TITLE = RAW_CONTENT[0].text;
const STORY_PARAGRAPHS = RAW_CONTENT.slice(1);

export default function BayHynPage() {
  const { setScrollRatio } = useBayHynBackground();

  return (
    <div className="relative w-full text-white overflow-x-hidden">
      <StoryScroller
        title={HERO_TITLE}
        label="Realm of BayHyn"
        labelClassName="block text-xs md:text-sm uppercase tracking-[0.4em] text-purple-200/70 mb-2 md:mb-4 animate-pulse pointer-events-none"
        heroTitleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight pointer-events-none"
        inactiveBlurPx={0}
        onScrollRatioChange={setScrollRatio}
        renderTitle={(t) => (
          <SparklesText
            as="span"
            text={t}
            sparklesCount={10}
            className="inline-block"
            textClassName="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-fuchsia-200 to-white/70 drop-shadow-lg"
            colors={{ first: "#b4a2fd", second: "#a855f7" }}
          />
        )}
        blocks={STORY_PARAGRAPHS}
        progressBarClassName="absolute bottom-0 left-0 h-[2px] w-full bg-purple-300 origin-left"
      />
    </div>
  );
}
