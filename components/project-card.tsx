"use client"

import { ArrowUpRight, Youtube } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ProjectCardProps {
  title: string
  description: string
  image?: string
  url: string
  skills: string[]
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  anyHovered: boolean
}

export function ProjectCard({
  title,
  description,
  image,
  url,
  skills,
  isHovered,
  onHover,
  onLeave,
  anyHovered,
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        "group relative grid gap-4 pb-1 transition-all duration-300 sm:grid-cols-8 sm:gap-8 md:gap-4 rounded-sm p-5 -mx-5 border",
        "bg-transparent border-zinc-800",
        isHovered && "border-white/80 bg-zinc-900/30 shadow-[0_0_40px_rgba(255,255,255,0.03)]",
        anyHovered && !isHovered && "opacity-40"
      )}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="z-10 sm:order-2 sm:col-span-6">
        <h3 className="font-medium leading-snug">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-baseline font-semibold leading-tight transition-colors duration-300",
              isHovered ? "text-white" : "text-zinc-200"
            )}
          >
            {title}
            <ArrowUpRight className="ml-1 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
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
        <div className="mt-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  disabled
                  className="inline-flex items-center gap-2 rounded-sm border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-500 opacity-50 cursor-not-allowed transition-all duration-200 font-mono uppercase tracking-widest"
                  aria-label="Watch video breakdown — recording in progress"
                >
                  <Youtube className="h-3.5 w-3.5" />
                  Watch Breakdown
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs"
              >
                Recording in progress — YouTube channel launching soon.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      {image && (
        <div className="sm:order-1 sm:col-span-2">
          <Image
            src={image}
            alt={`${title} project thumbnail`}
            width={200}
            height={120}
            className={cn(
              "rounded-sm border transition-all duration-300 sm:translate-y-1",
              isHovered ? "border-zinc-500 brightness-100" : "border-zinc-800 brightness-75"
            )}
          />
        </div>
      )}
    </div>
  )
}
