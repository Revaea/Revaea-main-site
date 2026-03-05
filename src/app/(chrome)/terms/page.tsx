import type { LucideIcon } from "lucide-react";
import {
  ShieldCheck,
  ShieldQuestion,
  Workflow,
  UserCheck,
  ContactRound,
  CalendarDays,
} from "lucide-react";
import BackgroundWithMask from "@/components/ui/BackgroundWithMask";
import BlurText from "@/components/ui/BlurText";
import Reveal from "@/components/ui/Reveal";

type Section = {
  title: string;
  description: string;
  icon: LucideIcon;
  bullets?: string[];
  highlight?: string;
};

const sections: Section[] = [
  {
    title: "Acceptance of Terms",
    description:
      "Revaea-Chat is a self-hosted platform. Signing in through Google or any channel confirms that you understand and accept these Terms of Service as well as applicable regulations.",
    icon: Workflow,
  },
  {
    title: "User Conduct",
    description:
      "We safeguard a calm, collaborative environment. Activities that are unlawful, abusive, or disruptive are prohibited and may result in immediate suspension.",
    bullets: [
      "Do not run automated spam, phishing flows, or distribute malware",
      "Avoid impersonation, doxxing, or targeted harassment",
      "Respect the privacy and confidentiality of every participant",
    ],
    icon: ShieldQuestion,
  },
  {
    title: "Account Responsibility",
    description:
      "You are responsible for protecting your credentials and monitoring your activity. Losses caused by weak passwords, token leaks, or unattended devices cannot be attributed to the administrator.",
    highlight:
      "Best practice: enable multifactor login wherever available, rotate passwords regularly, and revoke unused sessions promptly.",
    icon: UserCheck,
  },
  {
    title: "Limitation of Liability",
    description:
      "Revaea-Chat is provided on an \"as is\" basis. The administrator and contributors are not liable for indirect, incidental, special, or consequential damages stemming from downtime or data loss.",
    icon: ShieldCheck,
  },
];

const TermsPage = () => {
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
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-800 dark:bg-cyan-500/15 dark:text-cyan-200">
              <CalendarDays className="h-4 w-4" /> Effective: 2025-12-25
            </div>
            <BlurText
              as="h1"
              text="Terms of Service"
              className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl"
              animateBy="words"
            />
            <p className="text-sm leading-relaxed text-muted">
              Welcome to Revaea-Chat (https://c.revaea.com). These terms describe the mindful, respectful environment
              we build together. Accessing the service means you understand and accept the guidance below.
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
                {section.highlight && (
                  <p className="rounded-xl border border-cyan-200/70 bg-cyan-500/10 p-4 text-sm font-medium text-cyan-800 dark:border-cyan-500/20 dark:bg-cyan-500/5 dark:text-cyan-100">
                    {section.highlight}
                  </p>
                )}
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={sections.length * 60}>
          <footer className="mt-16 space-y-6 text-sm leading-relaxed text-muted">
            <div className="flex items-center gap-2 text-base font-semibold text-foreground">
              <ShieldCheck className="h-5 w-5 text-brand" />
              Updates
            </div>
            <p>
              Terms may evolve as the service grows. Updates appear here, and continued use after changes indicates
              acceptance of the revised terms.
            </p>
            <div className="flex items-center gap-2 text-base font-semibold text-foreground">
              <ContactRound className="h-5 w-5 text-brand" />
              Contact
            </div>
            <p>
              Reach the administrator at
              <a
                className="mx-1 font-medium text-brand underline decoration-dotted underline-offset-4 transition hover:text-brand/80"
                href="mailto:cedar2352@gmail.com"
              >
                cedar2352@gmail.com
              </a>
              for clarification or account related requests.
            </p>
          </footer>
        </Reveal>
      </div>
    </main>
  );
};

export default TermsPage;
