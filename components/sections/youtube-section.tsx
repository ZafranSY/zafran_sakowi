import { ScrollReveal } from "@/components/scroll-reveal"
import { Youtube, Clock, Bell } from "lucide-react"

const VIDEOS = [
  {
    title: "Building a Self-Hosted k3s Cluster on Bare Metal",
    duration: "~32 min",
    category: "Infrastructure",
    description: "Full walkthrough: from bare Ubuntu Server 24.04 to a production-grade k3s cluster with Helm, Traefik ingress, and cert-manager.",
    tags: ["k3s", "Ubuntu", "Helm"],
    accentColor: "border-zinc-700",
    bgBar: "from-zinc-800/40",
  },
  {
    title: "Next.js 15 & Supabase: Full-Stack App in One Weekend",
    duration: "~48 min",
    category: "Full Stack",
    description: "Build a complete SaaS product — auth, database, storage, and edge functions — using the latest Next.js App Router patterns.",
    tags: ["Next.js 15", "Supabase", "TypeScript"],
    accentColor: "border-zinc-700",
    bgBar: "from-zinc-800/40",
  },
  {
    title: "FloraScan: Training MobileNetV2 for Plant Disease Detection",
    duration: "~25 min",
    category: "Machine Learning",
    description: "End-to-end ML: dataset prep, transfer learning with MobileNetV2, FastAPI serving, and React Native client integration.",
    tags: ["Python", "TensorFlow", "FastAPI"],
    accentColor: "border-zinc-700",
    bgBar: "from-zinc-800/40",
  },
]

function ThumbnailPlaceholder({ title, category }: { title: string; category: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950">
      {/* Abstract grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 0, transparent 50%), repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/60 to-transparent" aria-hidden="true" />

      {/* Category label top-left */}
      <div className="absolute left-3 top-3">
        <span className="rounded-sm border border-zinc-700 bg-zinc-900/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-zinc-500">
          {category}
        </span>
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/80 backdrop-blur-sm">
          <Youtube className="h-5 w-5 text-zinc-500" />
        </div>
        <p className="max-w-[85%] text-center text-xs font-medium text-zinc-500 leading-snug line-clamp-2">
          {title}
        </p>
      </div>

      {/* Coming Soon overlay */}
      <div className="yt-overlay">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur-sm">
            <Clock className="h-4 w-4 text-white/70" />
          </div>
          <div>
            <p className="font-bold text-sm text-white tracking-tight">Coming Soon</p>
            <p className="font-mono text-[10px] text-white/50 mt-0.5 uppercase tracking-widest">
              Channel launching 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function YoutubeSection() {
  return (
    <section
      id="the-lab"
      className="mb-24 scroll-mt-24"
      aria-label="The Lab — Technical Breakdowns"
    >
      {/* Section label */}
      <ScrollReveal id="lab-label">
        <div className="mb-8 flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-600">
            04 / The Lab
          </span>
          <div className="flex-1 h-px bg-zinc-900" />
        </div>
      </ScrollReveal>

      {/* Section heading */}
      <ScrollReveal delay={60} id="lab-heading">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Technical Breakdowns
            </h2>
            <p className="mt-1.5 text-sm text-zinc-600 max-w-sm leading-relaxed">
              Deep-dive videos covering full-stack development, homelab infrastructure,
              and machine learning — no fluff, only code.
            </p>
          </div>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-zinc-800 bg-zinc-950 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:border-zinc-600 hover:text-white transition-all duration-200"
          >
            <Bell className="h-3.5 w-3.5" />
            Notify Me
          </a>
        </div>
      </ScrollReveal>

      {/* Video grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {VIDEOS.map((video, i) => (
          <ScrollReveal key={video.title} delay={100 + i * 80} id={`lab-video-${i}`}>
            <div className="group flex flex-col gap-3">
              {/* Thumbnail */}
              <ThumbnailPlaceholder title={video.title} category={video.category} />

              {/* Meta */}
              <div className="px-0.5">
                <div className="flex items-center gap-2 mb-1.5">
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] uppercase tracking-widest text-zinc-700"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto font-mono text-[9px] text-zinc-700 flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" />
                    {video.duration}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-zinc-300 leading-snug group-hover:text-white transition-colors duration-200">
                  {video.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Subscribe CTA */}
      <ScrollReveal delay={400} id="lab-subscribe">
        <div className="mt-10 rounded-md border border-zinc-800 bg-zinc-950 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Youtube className="h-4 w-4 text-zinc-500" />
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-600">
                YouTube Channel
              </span>
            </div>
            <p className="text-sm font-medium text-zinc-300">
              Subscribe to get notified when the first breakdown drops.
            </p>
            <p className="mt-0.5 text-xs text-zinc-700">
              Infrastructure deep-dives. No ads. No fluff.
            </p>
          </div>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 rounded-sm bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black transition-all duration-200 hover:bg-zinc-200 active:scale-95"
          >
            <Youtube className="h-3.5 w-3.5" />
            Subscribe
          </a>
        </div>
      </ScrollReveal>
    </section>
  )
}
