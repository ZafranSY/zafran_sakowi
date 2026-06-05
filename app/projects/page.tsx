import type { Metadata } from "next"
import Link from "next/link"
import { MouseSpotlight } from "@/components/mouse-spotlight"
import { SidebarShell } from "@/components/sidebar-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { PROJECTS } from "@/lib/projects-data"
import { ArrowUpRight, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Projects | Zafran Sakowi",
  description:
    "A deep dive into the real-world systems I have built — from gym management platforms and AI-powered crop diagnostics to corporate CMS and government MIS.",
}


export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="bg-radial-glow" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />
      <MouseSpotlight />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-black"
      >
        Skip to content
      </a>

      <div className="relative z-10 mx-auto max-w-screen-xl">
        <div className="lg:flex">
          <SidebarShell />

          <main
            id="main-content"
            className="lg:ml-[380px] flex-1 px-6 pt-24 pb-24 md:px-12 lg:px-16 lg:py-24"
          >
            {/* Page header */}
            <ScrollReveal>
              <div className="mb-12">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-zinc-600">
                    05 / Projects
                  </span>
                  <div className="flex-1 h-px bg-zinc-900" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">
                  Things I&apos;ve Built
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-500">
                  Each project here is a system I designed, built, and deployed end-to-end.
                  These aren&apos;t tutorial clones — they solve real operational problems for real clients or academic challenges.
                </p>
              </div>
            </ScrollReveal>

            {/* Projects */}
            <ol className="flex flex-col gap-20">
              {PROJECTS.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 60}>
                  <li id={project.id} className="scroll-mt-24 group">
                    {/* Project header */}
                    <div className="flex items-start justify-between mb-6 gap-4">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 mb-1">
                          {project.context} · {project.year}
                        </p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h2 className="text-2xl font-bold text-white tracking-tight">{project.name}</h2>
                          <Link
                            href={`/projects/${project.slug}`}
                            className="inline-flex items-center gap-1.5 rounded-sm border border-zinc-600 bg-zinc-800 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-100 hover:bg-white hover:border-white hover:text-black transition-all duration-200 active:scale-95"
                          >
                            <FileText className="h-3 w-3" />
                            Technical Case Study
                          </Link>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`font-mono text-[10px] uppercase tracking-widest border rounded-sm px-2.5 py-1 ${project.statusColor}`}>
                          {project.status}
                        </span>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.name} on GitHub`}
                            className="rounded-sm border border-zinc-800 bg-zinc-900 p-1.5 text-zinc-600 hover:border-zinc-600 hover:text-white transition-all duration-200"
                          >
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-sm leading-relaxed text-zinc-400 mb-8 max-w-2xl">
                      {project.summary}
                    </p>

                    {/* Highlights */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                      {project.highlights.map(({ label, sub }) => (
                        <div key={label} className="rounded-sm border border-zinc-800 bg-zinc-900/60 p-3">
                          <p className="font-mono text-[10px] font-semibold text-zinc-300 uppercase tracking-wide mb-1">{label}</p>
                          <p className="font-mono text-[9px] text-zinc-600 leading-snug">{sub}</p>
                        </div>
                      ))}
                    </div>

                    {/* Problem / Solution */}
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                      <div className="rounded-sm border border-zinc-800 bg-zinc-950/60 p-5">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 mb-3">The Problem</p>
                        <p className="text-xs leading-relaxed text-zinc-500">{project.problem}</p>
                      </div>
                      <div className="rounded-sm border border-zinc-800 bg-zinc-950/60 p-5">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 mb-3">The Solution</p>
                        <p className="text-xs leading-relaxed text-zinc-500">{project.solution}</p>
                      </div>
                    </div>

                    {/* Impact metrics */}
                    <div className="flex flex-wrap gap-4 mb-8">
                      {project.impact.map(({ metric, label }) => (
                        <div key={label} className="flex items-center gap-3 rounded-sm border border-zinc-800 bg-zinc-950 px-5 py-3">
                          <span className="font-mono text-xl font-bold text-white tabular-nums">{metric}</span>
                          <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-wider max-w-[120px] leading-tight">{label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stack */}
                    <ul className="flex flex-wrap gap-2 mb-8" aria-label="Technologies">
                      {project.stack.map((t) => (
                        <li key={t}>
                          <Badge
                            variant="secondary"
                            className="rounded-sm border border-zinc-800 bg-zinc-900 px-2.5 py-0.5 text-[10px] font-medium text-zinc-400 hover:border-zinc-700 transition-colors duration-200"
                          >
                            {t}
                          </Badge>
                        </li>
                      ))}
                    </ul>

                    {/* CTA buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 rounded-sm bg-white px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-widest text-black transition-all duration-200 hover:bg-zinc-100 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.12)]"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        Technical Case Study →
                      </Link>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-sm border border-zinc-700 bg-transparent px-5 py-2.5 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white hover:border-zinc-500 transition-all duration-200"
                        >
                          View Documentation
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>

                    {/* Divider */}
                    {i < PROJECTS.length - 1 && (
                      <div className="mt-16 h-px bg-zinc-900" />
                    )}
                  </li>
                </ScrollReveal>
              ))}
            </ol>

            <footer className="mt-20 border-t border-zinc-900 pt-8">
              <p className="font-mono text-xs text-zinc-700 leading-relaxed">
                Designed and built by{" "}
                <span className="text-zinc-500">Zafran Sakowi</span>
                {" "}&mdash; Next.js 15, Tailwind CSS, self-hosted on Ubuntu 24.04 in Johor Bahru.
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
