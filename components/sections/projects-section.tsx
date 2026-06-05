"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "Cipta Craft — E-Commerce Platform",
    description:
      "A full-stack e-commerce platform for handcrafted goods. Features a custom CMS, real-time inventory management, Stripe payments, and a performant storefront built with Next.js and Tailwind CSS.",
    url: "https://github.com",
    skills: ["Next.js", "Tailwind CSS", "Stripe", "Supabase", "TypeScript"],
  },
  {
    title: "Cipta Craft — Design System",
    description:
      "A component library and design token system powering the Cipta Craft brand. Built with Storybook, Radix UI primitives, and automated visual regression testing via Chromatic.",
    url: "https://github.com",
    skills: ["React", "Storybook", "Radix UI", "Chromatic", "TypeScript"],
  },
  {
    title: "Cipta Craft — Analytics Dashboard",
    description:
      "An internal analytics dashboard for tracking sales, customer behavior, and inventory trends. Built with Recharts and connected to a real-time Supabase pipeline.",
    url: "https://github.com",
    skills: ["Next.js", "Recharts", "Supabase", "Tailwind CSS"],
  },
  {
    title: "Homelab Monitoring Stack",
    description:
      "A self-hosted observability stack deployed on Ubuntu Server 24.04 with Prometheus scraping metrics from all cluster nodes, Grafana dashboards, and Loki for centralized log management.",
    url: "https://github.com",
    skills: ["Prometheus", "Grafana", "Loki", "Docker", "Ubuntu 24.04"],
  },
]

export function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      id="projects"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Selected projects"
    >
      {/* Mobile sticky heading */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen sidebar-glass px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">
          Project Summary
        </h2>
      </div>
      <div>
        <ol className="flex flex-col gap-4">
          {projects.map((project, index) => (
            <ScrollReveal key={index} delay={index * 80}>
              <li>
                <ProjectCard
                  {...project}
                  isHovered={hoveredIndex === index}
                  onHover={() => setHoveredIndex(index)}
                  onLeave={() => setHoveredIndex(null)}
                  anyHovered={hoveredIndex !== null}
                />
              </li>
            </ScrollReveal>
          ))}
        </ol>
        <ScrollReveal delay={projects.length * 80}>
          <div className="mt-10">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors duration-300"
            >
              View Full Archive
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
