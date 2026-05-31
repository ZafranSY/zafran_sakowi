"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import {
  Dumbbell,
  Leaf,
  Layout,
  Tv,
  ArrowUpRight,
  CreditCard,
  MessageSquare,
  Brain,
  ShieldCheck,
  QrCode,
} from "lucide-react"

/* ─── Waveform Bars (static — no Math.random hydration mismatch) ── */
const WAVEFORM_BARS = [
  32, 45, 28, 55, 38, 62, 22, 48, 35, 58,
  42, 30, 52, 40, 25, 65, 35, 50, 44, 30,
  58, 22, 45, 36, 62, 28, 48, 38, 55, 32,
  42, 60, 35, 50, 28, 45, 38, 52, 30, 44,
]

export function BentoProjectsSection() {
  return (
    <section
      id="projects"
      className="mb-24 scroll-mt-24"
      aria-label="Projects"
    >
      {/* Section label */}
      <ScrollReveal id="projects-label">
        <div className="mb-8 flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-600">
            03 / Projects
          </span>
          <div className="flex-1 h-px bg-zinc-900" />
        </div>
      </ScrollReveal>

      {/*
        Bento grid layout (desktop 3-col):
        Row 1: [XFitness ── 2 cols ──] [Anjung Meriah — 1 col, row-span-2]
        Row 2: [FloraScan ─────── 2 cols ─────────────]
        Row 3: [TVPSS MIS ─────── 3 cols ─────────────]
      */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* ── Card 1: XFitness (LARGE — 2 cols) ────────────────── */}
        <ScrollReveal delay={80} className="sm:col-span-2" id="project-xfitness">
          <article className="bento-card group h-full min-h-[300px] flex flex-col p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="rounded-sm border border-zinc-700 bg-zinc-900 p-2 group-hover:border-zinc-500 transition-colors duration-300">
                  <Dumbbell className="h-5 w-5 text-zinc-300" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 mb-0.5">
                    Cipta Craft · Lead Developer
                  </p>
                  <h3 className="font-semibold text-zinc-100 text-base leading-tight group-hover:text-white transition-colors duration-300">
                    XFitness
                  </h3>
                </div>
              </div>
              <a
                href="https://github.com/zafransakowi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View XFitness on GitHub"
                className="shrink-0 rounded-sm border border-zinc-800 bg-zinc-900 p-1.5 text-zinc-600 hover:border-zinc-600 hover:text-white transition-all duration-200"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              {[
                { icon: CreditCard,    label: "Payment Integration",  sub: "Revenue Monster · Razorpay" },
                { icon: MessageSquare, label: "Real-time Chat",        sub: "Trainer ↔ Member messaging" },
                { icon: QrCode,        label: "QR Access Control",     sub: "Keycard-free gym entry" },
                { icon: ShieldCheck,   label: "Row-Level Security",    sub: "Supabase RLS enforcement" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="rounded-sm border border-zinc-800 bg-zinc-900/60 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="h-3.5 w-3.5 text-zinc-500" />
                    <span className="font-mono text-[10px] font-semibold text-zinc-300 uppercase tracking-wide">{label}</span>
                  </div>
                  <p className="font-mono text-[9px] text-zinc-600 leading-snug">{sub}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-xs leading-relaxed text-zinc-500 mb-4 flex-1">
              Comprehensive gym management ecosystem integrating memberships, payments, QR-based
              access control, and trainer booking into a unified web + mobile platform.
              Consolidated multiple operational systems, reducing administrative overhead by{" "}
              <span className="text-zinc-300 font-medium">50%</span>.
            </p>

            {/* Impact stat */}
            <div className="mb-4 flex items-center gap-3 rounded-sm border border-zinc-800 bg-zinc-950 px-4 py-2.5">
              <span className="font-mono text-lg font-bold text-white tabular-nums">50%</span>
              <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-wider">reduction in admin overhead</span>
            </div>

            {/* Stack badges */}
            <ul className="flex flex-wrap gap-2" aria-label="Technologies">
              {["Next.js 15", "React Native (Expo)", "Supabase", "PostgreSQL", "Cloudflare R2", "Razorpay"].map((t) => (
                <li key={t}>
                  <Badge
                    variant="secondary"
                    className="rounded-sm border border-zinc-800 bg-zinc-900 px-2.5 py-0.5 text-[10px] font-medium text-zinc-400 group-hover:border-zinc-700 transition-colors duration-200"
                  >
                    {t}
                  </Badge>
                </li>
              ))}
            </ul>
          </article>
        </ScrollReveal>

        {/* ── Card 3: Anjung Meriah CMS (1 col, row-span-2) ────── */}
        <ScrollReveal delay={160} className="sm:col-span-1 sm:row-span-2" id="project-anjung-meriah">
          <article className="bento-card group h-full min-h-[460px] flex flex-col p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="rounded-sm border border-zinc-700 bg-zinc-900 p-1.5 group-hover:border-zinc-500 transition-colors duration-300">
                <Layout className="h-4 w-4 text-zinc-400" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                  Cipta Craft · Full-Stack Dev
                </p>
                <h3 className="font-semibold text-zinc-200 text-sm group-hover:text-white transition-colors duration-300">
                  Anjung Meriah CMS
                </h3>
              </div>
            </div>

            {/* CMS preview mockup */}
            <div className="flex-1 rounded-sm border border-zinc-800 bg-zinc-950 overflow-hidden mb-4">
              <div className="flex items-center gap-1 border-b border-zinc-800 bg-zinc-900/50 px-3 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                <span className="ml-2 font-mono text-[9px] text-zinc-700">admin dashboard</span>
              </div>
              <div className="p-3 font-mono text-[9px] leading-[1.8] space-y-1">
                {[
                  { label: "Projects",    count: "12",  action: "CRUD ✓" },
                  { label: "Services",    count: "8",   action: "CRUD ✓" },
                  { label: "Properties",  count: "24",  action: "CRUD ✓" },
                  { label: "Promotions",  count: "5",   action: "CRUD ✓" },
                  { label: "Media Files", count: "147", action: "Upload ✓" },
                  { label: "Audit Logs",  count: "∞",   action: "Append-only" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between">
                    <span className="text-zinc-600">{row.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500">{row.count}</span>
                      <span className="text-zinc-700">{row.action}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs leading-relaxed text-zinc-500 mb-4">
              Full-stack corporate platform with a public website + secure admin CMS.
              JWT auth, rate limiting, ISR, and a database-driven content model — no
              developer intervention required for daily operations.
            </p>

            {/* Stack */}
            <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
              {["Next.js", "TypeScript", "PostgreSQL", "JWT", "shadcn/ui"].map((t) => (
                <li key={t}>
                  <Badge
                    variant="secondary"
                    className="rounded-sm border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[9px] font-medium text-zinc-500 group-hover:border-zinc-700 transition-colors duration-200"
                  >
                    {t}
                  </Badge>
                </li>
              ))}
            </ul>
          </article>
        </ScrollReveal>

        {/* ── Card 2: FloraScan (2 cols) ────────────────────────── */}
        <ScrollReveal delay={240} className="sm:col-span-2" id="project-florascan">
          <article className="bento-card group h-full flex flex-col sm:flex-row overflow-hidden">
            {/* Left: content */}
            <div className="flex-1 p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="rounded-sm border border-zinc-700 bg-zinc-900 p-1.5 group-hover:border-zinc-500 transition-colors duration-300">
                  <Leaf className="h-4 w-4 text-zinc-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                      Final Year Project · ML Dev
                    </p>
                    <Badge
                      variant="secondary"
                      className="rounded-full border border-amber-900/50 bg-amber-950/30 px-2 py-0 text-[9px] font-medium text-amber-600"
                    >
                      TensorFlow
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="rounded-full border border-sky-900/50 bg-sky-950/30 px-2 py-0 text-[9px] font-medium text-sky-600"
                    >
                      EfficientNetB0
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-zinc-200 text-sm group-hover:text-white transition-colors duration-300 mt-0.5">
                    FloraScan
                  </h3>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-zinc-500 mb-4">
                AI-powered papaya crop diagnostic tool. Two-stage pipeline: EfficientNetB0
                image classification for disease detection, followed by a Hugging Face LLM
                generating human-readable treatment recommendations for farmers.
              </p>

              <ul className="flex items-center gap-1">
                <li>
                  <div className="flex items-center gap-1.5">
                    <Brain className="h-3 w-3 text-zinc-600" />
                    <span className="font-mono text-[10px] text-zinc-600">2-stage ML pipeline</span>
                  </div>
                </li>
              </ul>

              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technologies">
                {["Python", "FastAPI", "TensorFlow", "Docker", "Hugging Face"].map((t) => (
                  <li key={t}>
                    <Badge
                      variant="secondary"
                      className="rounded-sm border border-zinc-800 bg-zinc-900 px-2.5 py-0.5 text-[10px] font-medium text-zinc-400 group-hover:border-zinc-700 transition-colors duration-200"
                    >
                      {t}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: model accuracy panel */}
            <div className="shrink-0 border-t sm:border-t-0 sm:border-l border-zinc-800 bg-zinc-950/60 p-5 flex flex-col justify-between w-full sm:w-44">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-700 mb-2">
                  Pipeline
                </p>
                <div className="space-y-2">
                  {[
                    { step: "01", label: "Image input",    note: "Real-world variability" },
                    { step: "02", label: "EfficientNetB0", note: "Disease classification" },
                    { step: "03", label: "HF LLM layer",   note: "Treatment generation" },
                    { step: "04", label: "Mobile API",      note: "FastAPI response" },
                  ].map((s) => (
                    <div key={s.step} className="flex gap-2.5 items-start">
                      <span className="font-mono text-[9px] text-zinc-700 shrink-0 mt-px">{s.step}</span>
                      <div>
                        <div className="font-mono text-[10px] font-semibold text-zinc-400">{s.label}</div>
                        <div className="font-mono text-[9px] text-zinc-700">{s.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 font-mono text-[9px] text-zinc-700">
                Containerized · Docker
              </div>
            </div>
          </article>
        </ScrollReveal>

        {/* ── Card 4: TVPSS MIS (full 3-col row) ───────────────── */}
        <ScrollReveal delay={320} className="sm:col-span-3" id="project-tvpss">
          <article className="bento-card group flex flex-col sm:flex-row gap-0 overflow-hidden">
            {/* Left: info */}
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-sm border border-zinc-700 bg-zinc-900 p-1.5 group-hover:border-zinc-500 transition-colors duration-300">
                    <Tv className="h-4 w-4 text-zinc-400" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                      Academic Project · Full-Stack Dev
                    </p>
                    <h3 className="font-semibold text-zinc-200 text-sm group-hover:text-white transition-colors duration-300 mt-0.5">
                      TVPSS Management Information System
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-zinc-500 mb-4 max-w-xl">
                Centralized system for managing school TV station operations across Johor.
                Role-based access for administrators, teachers, and student crews. Covers
                scheduling, equipment inventory tracking, and automated student onboarding workflows.
              </p>
              <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                {["Java", "Spring Boot", "Hibernate", "MySQL", "REST APIs"].map((t) => (
                  <li key={t}>
                    <Badge
                      variant="secondary"
                      className="rounded-sm border border-zinc-800 bg-zinc-900 px-2.5 py-0.5 text-[10px] font-medium text-zinc-400 group-hover:border-zinc-700 transition-colors duration-200"
                    >
                      {t}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: impact stat */}
            <div className="shrink-0 border-t sm:border-t-0 sm:border-l border-zinc-800 bg-zinc-950/60 p-6 flex flex-col justify-center items-center gap-2 w-full sm:w-48">
              <div className="text-4xl font-bold text-white tabular-nums">35%</div>
              <div className="font-mono text-[10px] text-zinc-600 uppercase tracking-wider text-center">
                reporting efficiency improvement
              </div>
              <div className="mt-2 font-mono text-[9px] text-zinc-700 text-center">
                Layered architecture · ORM · RESTful APIs
              </div>
            </div>
          </article>
        </ScrollReveal>

      </div>

      {/* View all link */}
      <ScrollReveal delay={440} id="projects-view-all">
        <div className="mt-8">
          <a
            href="https://github.com/zafransakowi"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-zinc-600 hover:text-white transition-colors duration-300"
          >
            View All Projects on GitHub
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </ScrollReveal>
    </section>
  )
}
