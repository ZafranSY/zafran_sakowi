"use client"

import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ExperienceCardProps {
  dateRange: string
  title: string
  company: string
  companyUrl?: string
  description: string
  skills: string[]
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  anyHovered: boolean
}

export function ExperienceCard({
  dateRange,
  title,
  company,
  companyUrl,
  description,
  skills,
  isHovered,
  onHover,
  onLeave,
  anyHovered,
}: ExperienceCardProps) {
  const CardWrapper = companyUrl ? "a" : "div"
  const cardProps = companyUrl
    ? { href: companyUrl, target: "_blank", rel: "noopener noreferrer" }
    : {}

  return (
    <CardWrapper
      {...cardProps}
      className={cn(
        "group relative grid gap-4 pb-1 transition-all duration-300 sm:grid-cols-8 sm:gap-8 md:gap-4 rounded-md p-5 border",
        "bg-zinc-950 border-zinc-800",
        isHovered && "border-white/20 bg-zinc-900/60 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.6)]",
        anyHovered && !isHovered && "opacity-40"
      )}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <header className="z-10 text-xs font-semibold uppercase tracking-widest text-zinc-500 sm:col-span-2 font-mono mt-1 shrink-0">
        {dateRange}
      </header>
      <div className="z-10 sm:col-span-6">
        <h3 className="font-medium leading-snug">
          <span
            className={cn(
              "inline-flex items-baseline font-semibold leading-tight transition-colors duration-300",
              isHovered ? "text-white" : "text-zinc-200"
            )}
          >
            {title} · {company}
            {companyUrl && (
              <ArrowUpRight className="ml-1 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            )}
          </span>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          {description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
          {skills.map((skill) => (
            <li key={skill}>
              <Badge
                variant="secondary"
                className="rounded-sm bg-zinc-800 text-zinc-300 border border-zinc-700 px-3 py-1 text-xs font-medium hover:border-zinc-500 hover:text-white transition-colors duration-200"
              >
                {skill}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </CardWrapper>
  )
}
