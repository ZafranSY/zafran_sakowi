import { MouseSpotlight } from "@/components/mouse-spotlight"
import { Sidebar } from "@/components/sidebar"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { BentoProjectsSection } from "@/components/sections/bento-projects-section"
import { YoutubeSection } from "@/components/sections/youtube-section"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Layered background effects */}
      <div className="bg-radial-glow" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />
      <MouseSpotlight />

      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-black"
      >
        Skip to content
      </a>

      <div className="relative z-10 mx-auto max-w-screen-xl">
        <div className="lg:flex">

          {/* ── Left Column: Fixed Sidebar ───────────────────────── */}
          <Sidebar />

          {/* ── Right Column: Scrolling Content ─────────────────── */}
          <main
            id="main-content"
            className="lg:ml-[380px] flex-1 px-6 pt-24 pb-24 md:px-12 lg:px-16 lg:py-24"
          >
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <BentoProjectsSection />
            <YoutubeSection />

            <footer className="mt-20 border-t border-zinc-900 pt-8">
              <p className="font-mono text-xs text-zinc-700 leading-relaxed">
                Designed and built by{" "}
                <span className="text-zinc-500">Zafran Sakowi</span>
                {" "}&mdash; Next.js 15, Tailwind CSS, self-hosted on Ubuntu 24.04 in Johor Bahru.
              </p>
              <p className="font-mono text-xs text-zinc-800 mt-1">
                zafransakowi@gmail.com &middot; +60 16-597 2862
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
