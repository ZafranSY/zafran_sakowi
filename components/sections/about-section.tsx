"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, GraduationCap, Building2 } from "lucide-react"

const SKILLS = [
  // Languages
  "TypeScript", "Java", "Python", "PHP", "Classic ASP", "T-SQL",
  // Frameworks
  "Next.js 15", "React 19", "Spring Boot", "FastAPI", "Laravel",
  // DevOps
  "Docker", "Ubuntu Server", "Hetzner", "Cloudflare R2", "JWT Auth",
]

export function AboutSection() {
  return (
    <section
      id="about"
      className="mb-24 scroll-mt-24"
      aria-label="About"
    >
      {/* Section label */}
      <ScrollReveal id="about-label">
        <div className="mb-8 flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-600">
            01 / About
          </span>
          <div className="flex-1 h-px bg-zinc-900" />
        </div>
      </ScrollReveal>

      {/* Two-column journey */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {/* The Student */}
        <ScrollReveal delay={80} id="about-student">
          <div className="rounded-md border border-zinc-800 bg-zinc-950 p-6 h-full">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="rounded-sm border border-zinc-700 bg-zinc-900 p-1.5">
                <GraduationCap className="h-4 w-4 text-zinc-400" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                The Student
              </span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              Studying Software Engineering at{" "}
              <span className="font-medium text-zinc-300">UTM</span>, Johor Bahru.
              Started with small projects at 3am — learning every framework imaginable,
              from Spring Boot APIs to React SPAs. Shipped it all, badly at first,
              then significantly better.
            </p>
            <div className="mt-4 font-mono text-xs text-zinc-700">UTM · Johor Bahru</div>
          </div>
        </ScrollReveal>

        {/* The Founder */}
        <ScrollReveal delay={160} id="about-founder">
          <div className="rounded-md border border-zinc-800 bg-zinc-950 p-6 h-full">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="rounded-sm border border-zinc-700 bg-zinc-900 p-1.5">
                <Building2 className="h-4 w-4 text-zinc-400" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                The Engineer
              </span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              Specialized in delivering{" "}
              <span className="font-semibold text-zinc-200">
                Independent B2B Solutions
              </span>{" "}
              for SMEs. Engineered{" "}
              <a
                href="https://xfitness.my"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-zinc-300 underline underline-offset-4 decoration-zinc-700 hover:decoration-white transition-colors duration-200"
              >
                XFitness
              </a>{" "}
              — a unified gym management platform reducing administrative overhead
              by 50%, and shipped full-scale corporate architectures for{" "}
              <a
                href="https://anjungmeriah.com.my"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-zinc-300 underline underline-offset-4 decoration-zinc-700 hover:decoration-white transition-colors duration-200"
              >
                Anjung Meriah Sdn. Bhd.
              </a>
            </p>
            <div className="mt-4 font-mono text-xs text-zinc-700">Client Work &mdash; Production Systems</div>
          </div>
        </ScrollReveal>
      </div>

      {/* Body copy */}
      <div className="flex flex-col gap-4 mb-10">
        <ScrollReveal delay={200} id="about-copy-1">
          <p className="text-sm leading-relaxed text-zinc-500">
            My focus is the full stack — the interface must be pixel-perfect AND the
            infrastructure must be resilient. During my internship at{" "}
            <span className="font-medium text-zinc-300">Mattel Malaysia (MMSB)</span>,
            I cut Quality Control dashboard load times from{" "}
            <span className="font-medium text-zinc-300">90 seconds to 5 seconds</span>{" "}
            by refactoring legacy SQL workflows and engineered a tamper-proof audit log
            preserving 100% historical transaction accuracy.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={260} id="about-copy-2">
          <p className="text-sm leading-relaxed text-zinc-500">
            I self-host on an{" "}
            <span className="font-medium text-zinc-300">Intel i3-8100 Ubuntu Server 24.04</span>{" "}
            cluster, experimenting with Docker, k3s, and automated CI/CD pipelines.
            Outside the terminal: documenting technical builds on YouTube (launching soon)
            and finishing my Final Year Project — FloraScan, an AI crop diagnostic system
            powered by EfficientNetB0 and a Hugging Face LLM.
          </p>
        </ScrollReveal>
      </div>

      {/* Skills grid */}
      <ScrollReveal delay={320} id="about-skills">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-zinc-700">
            Languages · Frameworks · DevOps
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Skills">
            {SKILLS.map((skill) => (
              <li key={skill}>
                <Badge
                  variant="secondary"
                  className="rounded-sm border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs font-medium text-zinc-400 hover:border-zinc-600 hover:text-white transition-colors duration-200 cursor-default"
                >
                  {skill}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>

      {/* CTAs */}
      <ScrollReveal delay={380} id="about-ctas">
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black transition-all duration-200 hover:bg-zinc-200 active:scale-95"
          >
            Download Resume
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href="mailto:zafransakowi@gmail.com"
            className="font-mono text-xs uppercase tracking-widest text-zinc-600 hover:text-white transition-colors duration-200"
          >
            zafransakowi@gmail.com
          </a>
        </div>
      </ScrollReveal>
    </section>
  )
}
