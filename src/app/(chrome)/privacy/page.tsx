import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  ContactRound,
  Database,
  FileCheck2,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import BackgroundWithMask from "@/components/ui/BackgroundWithMask";
import BlurText from "@/components/ui/BlurText";
import Reveal from "@/components/ui/Reveal";

type Section = {
  title: string;
  description: string;
  icon: LucideIcon;
  bullets?: string[];
  note?: string;
  linkLabel?: string;
  linkHref?: string;
};

const sections: Section[] = [
  {
    title: "Information We Collect",
    description:
      "When you authenticate with Google, the instance receives only the minimum identity data required to create your account and display your presence to other participants.",
    bullets: [
      "Google unique identifier (sub)",
      "Primary email address",
      "Display name and profile image",
    ],
    icon: Database,
  },
  {
    title: "How We Use Your Data",
    description:
      "Collected information is confined to operating the service. It enables account creation, secure session management, and visible identity cues during conversations.",
    bullets: [
      "Provision and maintenance of user accounts",
      "Displaying avatars and nicknames in conversation lists",
    ],
    note: "We do not sell, rent, or monetize your data. Aggregated analytics are disabled by default.",
    icon: FileCheck2,
  },
  {
    title: "Google API Limited Use",
    description:
      "Use and transfer of Google API information complies with the Google API Services User Data Policy. Data is never repurposed outside the stated chat functionality.",
    linkLabel: "Read the policy",
    linkHref: "https://developers.google.com/terms/api-services-user-data-policy",
    icon: ShieldCheck,
  },
  {
    title: "Data Storage and Security",
    description:
      "Information is stored on a self-hosted server controlled by the administrator. Access is restricted, backups are encrypted, and infrastructure is regularly patched.",
    icon: ShieldAlert,
  },
];

const PrivacyPage = () => {
  return (
    <main className="relative">
      <BackgroundWithMask
        magnetLinesProps={{
          rows: 18,
          columns: 18,
          lineColor: "#94a3b8",
          lineWidth: "0.6vmin",
          lineHeight: "3vmin",
          baseAngle: -8,
        }}
        maskOpacity={0.85}
        enableBlur={false}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <Reveal>
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-800 dark:bg-purple-500/15 dark:text-purple-200">
              <CalendarDays className="h-4 w-4" /> Effective: 2025-12-25
            </div>
            <BlurText
              as="h1"
              text="Privacy Policy"
              className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl"
              animateBy="words"
            />
            <p className="text-sm leading-relaxed text-muted">
              Your privacy matters. This self-hosted instance of Revaea-Chat collects only what is needed to
              authenticate conversations and keep the community safe.
            </p>
          </header>
        </Reveal>

        <div className="mt-12 space-y-12">
          {sections.map((section, index) => (
            <Reveal key={section.title} delayMs={index * 60}>
              <section className="space-y-4">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                  <section.icon className="h-5 w-5 text-brand" />
                  {section.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted">{section.description}</p>
                {section.bullets && (
                  <ul className="space-y-2 text-sm leading-relaxed text-muted">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.note && (
                  <p className="rounded-xl border border-purple-200/70 bg-purple-500/10 p-4 text-sm font-medium text-purple-800 dark:border-purple-500/20 dark:bg-purple-500/5 dark:text-purple-100">
                    {section.note}
                  </p>
                )}
                {section.linkHref && section.linkLabel && (
                  <a
                    className="inline-flex items-center gap-1 text-sm font-medium text-brand underline decoration-dotted underline-offset-4 transition hover:text-brand/80"
                    href={section.linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {section.linkLabel}
                  </a>
                )}
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={sections.length * 60}>
          <footer className="mt-16 space-y-6 text-sm leading-relaxed text-muted">
            <div className="flex items-center gap-2 text-base font-semibold text-foreground">
              <ContactRound className="h-5 w-5 text-brand" />
              Contact & Deletion
            </div>
            <p>
              You may request account removal, revoke Google access, or ask any privacy question by contacting the
              administrator at
              <a
                className="mx-1 font-medium text-brand underline decoration-dotted underline-offset-4 transition hover:text-brand/80"
                href="mailto:cedar2352@gmail.com"
              >
                cedar2352@gmail.com
              </a>
              . Requests are processed promptly.
            </p>
          </footer>
        </Reveal>
      </div>
    </main>
  );
};

export default PrivacyPage;
