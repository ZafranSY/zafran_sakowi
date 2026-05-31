"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Github, Linkedin, Twitter, Youtube, ExternalLink } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "the-lab", label: "The Lab" },
]

const SOCIALS = [
  { icon: Github, href: "https://github.com/zafransakowi", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/zafransakowi", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/zafransakowi", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com/@zafransakowi", label: "YouTube" },
]

const TERMINAL_LINES = [
  { type: "prompt", content: "whoami --verbose" },
  { type: "output", content: "name        Zafran Sakowi" },
  { type: "output", content: "location    Johor Bahru, Malaysia" },
  { type: "output", content: "framework   Next.js 15 + React 19" },
  { type: "output", content: "runtime     Docker · Ubuntu 24.04" },
  { type: "output", content: "db          PostgreSQL · Supabase" },
  { type: "output", content: "homelab     Intel i3-8100 · 4GB RAM" },
  { type: "cursor", content: "" },
]

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("about")
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
  }

  return (
    <>
      {/* ── Mobile Glassmorphism Top Bar ──────────────────────── */}
      <header className="glass-nav fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-4 lg:hidden">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="font-semibold text-sm text-foreground tracking-tight">
            Zafran Sakowi
          </span>
        </div>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex flex-col gap-1.5 p-1"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span className={cn("block h-px w-5 bg-zinc-400 transition-all duration-300", mobileOpen && "translate-y-2 rotate-45")} />
          <span className={cn("block h-px w-5 bg-zinc-400 transition-all duration-300", mobileOpen && "opacity-0")} />
          <span className={cn("block h-px w-5 bg-zinc-400 transition-all duration-300", mobileOpen && "-translate-y-2 -rotate-45")} />
        </button>
      </header>

      {/* ── Mobile Drawer ──────────────────────────────────────── */}
      {mobileOpen && (
        <div className="glass-nav fixed inset-x-0 top-[57px] z-30 px-6 py-8 lg:hidden">
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      activeSection === id
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                    )}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* ── Desktop Fixed Sidebar ──────────────────────────────── */}
      <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-[max(0px,calc(50%-640px+48px))] lg:w-[380px] lg:flex-col lg:justify-between lg:px-12 xl:px-16 lg:pt-20 lg:pb-12 xl:max-w-none min-h-0">
        {/* Top: Identity + Nav */}
        <div className="flex flex-col gap-6 xl:gap-8 min-h-0">
          {/* Identity */}
          <div>
            {/* Status Indicator */}
            <div className="mb-5 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="font-mono text-xs text-green-500 tracking-widest uppercase">
                Available for B2B Projects
              </span>
            </div>

            {/* Name */}
            <h1 className="text-5xl font-bold tracking-tight text-white leading-none">
              Zafran
              <br />
              Sakowi
            </h1>

            {/* Role */}
            <p className="mt-3 text-base font-medium text-zinc-400 tracking-tight">
              Software Engineer (Full-Stack) &middot; B2B Systems
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              Independent Client Work &middot; UTM
            </p>

            {/* Tagline */}
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-600 hidden xl:block">
              I build scalable B2B systems — from production-grade product interfaces
              to containerized infrastructure and resilient backend architectures.
            </p>
          </div>

          {/* Navigation with floating pill hover */}
          <nav aria-label="Page sections">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map(({ id, label }) => {
                const isActive = activeSection === id
                return (
                  <li key={id}>
                    <button
                      onClick={() => scrollTo(id)}
                      className={cn(
                        "nav-pill-hover group relative flex items-center gap-4 w-full text-left py-2 px-3 -mx-3 rounded-lg transition-all duration-300",
                        isActive ? "text-white" : "text-zinc-500 hover:text-white"
                      )}
                    >
                      {/* Animated line indicator */}
                      <span
                        className={cn(
                          "block h-px shrink-0 bg-current transition-all duration-300",
                          isActive ? "w-16" : "w-6 group-hover:w-10"
                        )}
                      />
                      <span className="font-mono text-xs font-bold uppercase tracking-widest">
                        {label}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Mini Terminal - Hidden on short screens to prioritize CTA */}
          <div className="hide-on-short rounded-md border border-zinc-800 bg-zinc-950 overflow-hidden">
            {/* Chrome bar */}
            <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-900/60 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 font-mono text-[10px] text-zinc-600 tracking-wider">
                bash — zafran@homelab
              </span>
            </div>
            {/* Terminal output */}
            <div className="px-4 py-3 font-mono text-[11px] leading-[1.7]">
              {TERMINAL_LINES.map((line, i) => (
                <div key={i}>
                  {line.type === "prompt" && (
                    <div>
                      <span className="text-zinc-600">{"$ "}</span>
                      <span className="text-zinc-300">{line.content}</span>
                    </div>
                  )}
                  {line.type === "output" && (
                    <div className="text-zinc-500 pl-3">{line.content}</div>
                  )}
                  {line.type === "cursor" && (
                    <div>
                      <span className="text-zinc-600">{"$ "}</span>
                      <span className="inline-block h-3 w-1.5 animate-pulse bg-zinc-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Social links + CTA */}
        <ScrollReveal immediate id="sidebar-bottom">
          <div className="flex flex-col gap-3 pt-2">
            <ul className="flex items-center gap-4" aria-label="Social links">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="block text-zinc-600 transition-colors duration-200 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-sm bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black transition-all duration-200 hover:bg-zinc-200 active:scale-95"
            >
              View Resume
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </ScrollReveal>
      </aside>
    </>
  )
}
