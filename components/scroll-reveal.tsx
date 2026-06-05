"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  id?: string
  delay?: number
  immediate?: boolean
}

export function ScrollReveal({ children, className, id, delay = 0, immediate = false }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(immediate)

  useEffect(() => {
    // If already revealed (or immediate), no need for observer
    if (isVisible) return

    // Ensure we are in a browser environment
    if (typeof window === "undefined") return

    const el = ref.current
    if (!el) return

    console.info(`[ScrollReveal] Initializing observer for: ${el.id || "unnamed"}`)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.info(`[ScrollReveal] Intersection detected: ${el.id || "unnamed"}`)
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "50px" // Start revealing slightly before it enters viewport
      }
    )

    observer.observe(el)

    // Safety fallback: if for some reason the interaction observer doesn't fire 
    // within 2 seconds of mount, force visibility to prevent blank screen.
    // This handles cases where scripts are loaded but observer fails or 
    // element is already "visible" but not intersecting (edge cases).
    const safetyTimeout = setTimeout(() => {
      setIsVisible((prev) => {
        if (!prev) {
          console.warn(`[ScrollReveal] Safety trigger fired for: ${el.id || "unnamed"}`)
          return true
        }
        return prev
      })
    }, 2000)

    return () => {
      observer.disconnect()
      clearTimeout(safetyTimeout)
    }
  }, [isVisible])

  return (
    <div
      ref={ref}
      id={id}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
