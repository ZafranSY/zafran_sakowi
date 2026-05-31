"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { ArrowUpRight, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section
      className="mb-24 pt-4"
      aria-label="Introduction"
    >
      {/* Overline */}
      <ScrollReveal immediate id="hero-overline">
        <div className="mb-6 flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-600">
            zafran.dev
          </span>
          <span className="font-mono text-xs text-zinc-800">/</span>
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-700">
            Johor Bahru, Malaysia
          </span>
        </div>
      </ScrollReveal>

      {/* Bold headline */}
      <ScrollReveal delay={60} immediate id="hero-headline">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.08] text-balance mb-6">
          I build high-stakes
          <br />
          digital systems.
        </h2>
      </ScrollReveal>

      {/* Supporting copy */}
      <ScrollReveal immediate delay={120} id="hero-copy">
        <p className="text-sm leading-relaxed text-zinc-500 max-w-lg mb-8">
          From migrating mission-critical Quality Control infrastructure at{" "}
          <span className="font-medium text-zinc-300">Mattel Malaysia</span> to shipping
          full-stack B2B platforms at{" "}
          <span className="font-medium text-zinc-300">Cipta Craft Solutions</span>.
          I specialize in building products that are fast, reliable, and maintainable
          at scale.
        </p>
      </ScrollReveal>

      {/* Stat callout */}
      <ScrollReveal delay={180} id="hero-stats">
        <div className="mb-8 inline-flex items-center gap-4 rounded-md border border-zinc-800 bg-zinc-950 px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-zinc-700 bg-zinc-900">
              <Zap className="h-4 w-4 text-zinc-300" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-xl font-bold text-white tabular-nums">90s</span>
                <span className="font-mono text-xs text-zinc-600">→</span>
                <span className="font-mono text-xl font-bold text-white tabular-nums">5s</span>
              </div>
              <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-wider leading-tight">
                Dashboard load time &mdash; Mattel QC system
              </p>
            </div>
          </div>
          <div className="hidden sm:block h-8 w-px bg-zinc-800" />
          <div className="hidden sm:block">
            <div className="font-mono text-xl font-bold text-white tabular-nums">50%</div>
            <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-wider leading-tight">
              Admin overhead &mdash; XFitness
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* CTAs */}
      <ScrollReveal delay={240} id="hero-ctas">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="inline-flex items-center gap-2 rounded-sm bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black transition-all duration-200 hover:bg-zinc-200 active:scale-95"
          >
            View Projects
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href="mailto:zafransakowi@gmail.com"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-zinc-600 hover:text-white transition-colors duration-200"
          >
            Get in Touch
          </a>
        </div>
      </ScrollReveal>

      {/* Divider */}
      <div className="mt-12 h-px bg-zinc-900" aria-hidden="true" />
    </section>
  )
}
