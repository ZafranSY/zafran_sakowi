import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { MouseSpotlight } from "@/components/mouse-spotlight"
import { SidebarShell } from "@/components/sidebar-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { PROJECTS, getProjectBySlug } from "@/lib/projects-data"
import {
  ArrowLeft,
  Github,
  Globe,
  Terminal,
  Users,
  Layers,
  AlertTriangle,
  Lightbulb,
  Lock,
} from "lucide-react"

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.name} — Technical Case Study | Zafran Sakowi`,
    description: project.summary,
  }
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <div className="relative min-h-screen bg-background">
      <div className="bg-radial-glow" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />
      <MouseSpotlight />

      <div className="relative z-10 mx-auto max-w-screen-xl">
        <div className="lg:flex">
          <SidebarShell />

          <main
            id="main-content"
            className="lg:ml-[380px] flex-1 px-6 pt-24 pb-24 md:px-12 lg:px-16 lg:py-24"
          >
            {/* Back link */}
            <ScrollReveal>
              <Link
                href="/projects"
                className="group mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-600 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                All Projects
              </Link>
            </ScrollReveal>

            {/* Header */}
            <ScrollReveal>
              <div className="mb-10">
                <div className="mb-3 flex items-center gap-3 flex-wrap">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest border rounded-sm px-2.5 py-1 ${project.statusColor}`}
                  >
                    {project.status}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                    {project.context} · {project.year}
                  </span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white leading-tight mb-4">
                  {project.name}
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
                  {project.summary}
                </p>

                {/* Links */}
                <div className="mt-6 flex items-center gap-3 flex-wrap">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-sm border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-400 hover:border-zinc-600 hover:text-white transition-all duration-200"
                    >
                      <Github className="h-3.5 w-3.5" />
                      {project.githubPublic ? "View on GitHub" : "Private Repository"}
                      {!project.githubPublic && <Lock className="h-3 w-3 text-zinc-600" />}
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-sm border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-700 hover:text-white transition-all duration-200"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      Live Site
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>

            {/* Impact metrics strip */}
            <ScrollReveal delay={60}>
              <div className="mb-12 flex flex-wrap gap-4">
                {project.impact.map(({ metric, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-sm border border-zinc-800 bg-zinc-950 px-5 py-3"
                  >
                    <span className="font-mono text-xl font-bold text-white tabular-nums">
                      {metric}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-wider max-w-[120px] leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Tech stack */}
            <ScrollReveal delay={80}>
              <div className="mb-12">
                <SectionLabel label="Tech Stack" />
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.stack.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="rounded-sm border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-300"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <Divider />

            {/* Stakeholders */}
            <ScrollReveal delay={100}>
              <div className="mb-12">
                <SectionLabel label="Stakeholders" icon={<Users className="h-4 w-4" />} />
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.stakeholders.map(({ role, responsibility }) => (
                    <div
                      key={role}
                      className="rounded-sm border border-zinc-800 bg-zinc-950/60 p-4"
                    >
                      <p className="font-mono text-xs font-semibold text-zinc-300 mb-1.5">
                        {role}
                      </p>
                      <p className="text-xs leading-relaxed text-zinc-500">{responsibility}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <Divider />

            {/* Problem / Solution */}
            <ScrollReveal delay={100}>
              <div className="mb-12 grid md:grid-cols-2 gap-4">
                <div className="rounded-sm border border-zinc-800 bg-zinc-950/60 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 mb-3">
                    The Problem
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-400">{project.problem}</p>
                </div>
                <div className="rounded-sm border border-zinc-800 bg-zinc-950/60 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 mb-3">
                    The Solution
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-400">{project.solution}</p>
                </div>
              </div>
            </ScrollReveal>

            <Divider />

            {/* Architecture */}
            <ScrollReveal delay={100}>
              <div className="mb-12">
                <SectionLabel label="Architecture" icon={<Layers className="h-4 w-4" />} />
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 mb-6">
                  {project.architecture.overview}
                </p>
                <ol className="flex flex-col gap-3">
                  {project.architecture.layers.map((layer, i) => (
                    <li key={layer.name} className="flex gap-4 rounded-sm border border-zinc-800 bg-zinc-950/40 p-5">
                      <span className="font-mono text-xs text-zinc-700 shrink-0 mt-0.5 w-5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-mono text-xs font-semibold text-zinc-300 mb-1.5">
                          {layer.name}
                        </p>
                        <p className="text-xs leading-relaxed text-zinc-500">{layer.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>

            <Divider />

            {/* Dev Setup */}
            <ScrollReveal delay={100}>
              <div className="mb-12">
                <SectionLabel label="Dev Setup" icon={<Terminal className="h-4 w-4" />} />

                {/* Prerequisites */}
                <div className="mt-4 mb-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 mb-2">
                    Prerequisites
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {project.devSetup.prerequisites.map((p) => (
                      <li key={p}>
                        <Badge
                          variant="secondary"
                          className="rounded-sm border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[10px] font-medium text-zinc-400"
                        >
                          {p}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Steps */}
                <div className="rounded-sm border border-zinc-800 bg-zinc-950 overflow-hidden">
                  <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-900/60 px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                    <span className="ml-2 font-mono text-[10px] text-zinc-600">
                      bash — setup
                    </span>
                  </div>
                  <div className="p-5 font-mono text-xs leading-loose">
                    {project.devSetup.steps.map((step, i) => (
                      <div key={i} className="mb-1">
                        <div className="flex gap-2">
                          <span className="text-zinc-600 shrink-0">$</span>
                          <span className="text-zinc-300">{step.cmd}</span>
                        </div>
                        {step.note && (
                          <p className="pl-4 text-[10px] text-zinc-600 leading-snug mt-0.5">
                            # {step.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <Divider />

            {/* Challenges */}
            <ScrollReveal delay={100}>
              <div className="mb-12">
                <SectionLabel
                  label="Challenges"
                  icon={<AlertTriangle className="h-4 w-4" />}
                />
                <ol className="mt-4 flex flex-col gap-4">
                  {project.challenges.map((c, i) => (
                    <li key={c.title} className="flex gap-4 rounded-sm border border-zinc-800 bg-zinc-950/40 p-5">
                      <span className="font-mono text-xs text-zinc-700 shrink-0 mt-0.5 w-5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-mono text-xs font-semibold text-zinc-300 mb-1.5">
                          {c.title}
                        </p>
                        <p className="text-xs leading-relaxed text-zinc-500">{c.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>

            <Divider />

            {/* Learnings */}
            <ScrollReveal delay={100}>
              <div className="mb-12">
                <SectionLabel label="What I Learned" icon={<Lightbulb className="h-4 w-4" />} />
                <ul className="mt-4 flex flex-col gap-3">
                  {project.learnings.map((l, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span className="font-mono text-xs text-zinc-700 shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm leading-relaxed text-zinc-400">{l}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Back CTA */}
            <ScrollReveal delay={120}>
              <div className="mt-16 flex gap-4 flex-wrap">
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-600 hover:text-white transition-colors duration-200"
                >
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                  Back to Projects
                </Link>
              </div>
            </ScrollReveal>

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

function SectionLabel({
  label,
  icon,
}: {
  label: string
  icon?: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3">
      {icon && <span className="text-zinc-500">{icon}</span>}
      <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-500">{label}</h2>
      <div className="flex-1 h-px bg-zinc-900" />
    </div>
  )
}

function Divider() {
  return <div className="mb-12 h-px bg-zinc-900" />
}
