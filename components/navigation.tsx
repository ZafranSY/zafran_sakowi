"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Project Summary" },
  { id: "the-lab", label: "The Lab" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-50% 0px -50% 0px" }
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="hidden lg:block" aria-label="In-page jump links">
      <ul className="flex flex-col gap-5">
        {navItems.map(({ id, label }) => {
          const isActive = activeSection === id
          return (
            <li key={id}>
              <button
                onClick={() => handleClick(id)}
                className={cn(
                  "group flex items-center gap-4 text-xs font-bold uppercase tracking-widest transition-colors duration-300",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-zinc-300"
                )}
              >
                <span className="relative flex items-center">
                  <motion.span
                    className="block h-px bg-current"
                    animate={{ width: isActive ? 64 : 32 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </span>
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
