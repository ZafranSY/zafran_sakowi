"use client"

import { useState } from "react"
import { ExperienceCard } from "@/components/experience-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ArrowUpRight } from "lucide-react"

const experiences = [
  {
    dateRange: "Jul 2025 — Present",
    title: "Independent Software Engineer (Full-Stack)",
    company: "Cipta Craft Solutions",
    companyUrl: "https://ciptacraft.my",
    description:
      "Delivering end-to-end B2B solutions for industrial clients and SMEs. Managed the full SDLC for XFitness (https://xfitness.my) — a gym management platform reducing overhead by 50%. Engineered custom CMS architectures and corporate portals using React 19 and Next.js 15. Integrated multi-gateway payment processing (Revenue Monster, Razorpay) and high-performance real-time features.",
    skills: ["Next.js 15", "React 19", "TypeScript", "Supabase", "PostgreSQL", "Cloudflare R2", "Docker"],
  },
  {
    dateRange: "Aug 2025 — Jan 2026",
    title: "IT Intern — Software Developer",
    company: "Mattel Malaysia Sdn Bhd",
    companyUrl: "https://corporate.mattel.com",
    description:
      "Modernized mission-critical Quality Control (QC) systems for high-volume manufacturing. Reduced dashboard load times from 90s to 5s by refactoring legacy SQL workflows. Engineered a tamper-proof audit log system ensuring 100% data integrity for QC protocols. Successfully migrated legacy records while preserving 100% historical transaction accuracy.",
    skills: ["Classic ASP", "T-SQL", "SQL Server", "JavaScript", "VBScript"],
  },
]

export function ExperienceSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      id="experience"
      className="mb-24 scroll-mt-24"
      aria-label="Work experience"
    >
      {/* Section label */}
      <ScrollReveal id="experience-label">
        <div className="mb-8 flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-600">
            02 / Experience
          </span>
          <div className="flex-1 h-px bg-zinc-900" />
        </div>
      </ScrollReveal>
      <div>
        <ol className="flex flex-col gap-4">
          {experiences.map((experience, index) => (
            <ScrollReveal key={index} delay={index * 80} id={`experience-card-${index}`}>
              <li>
                <ExperienceCard
                  {...experience}
                  isHovered={hoveredIndex === index}
                  onHover={() => setHoveredIndex(index)}
                  onLeave={() => setHoveredIndex(null)}
                  anyHovered={hoveredIndex !== null}
                />
              </li>
            </ScrollReveal>
          ))}
        </ol>
        <ScrollReveal delay={experiences.length * 80} id="experience-resume">
          <div className="mt-10">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors duration-300"
            >
              View Full Résumé
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
