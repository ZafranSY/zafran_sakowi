"use client"

import { useState } from "react"
import { MouseSpotlight } from "@/components/mouse-spotlight"
import { SidebarShell } from "@/components/sidebar-shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, BookOpen, Terminal, Cpu, Globe, ArrowRight, ArrowUp } from "lucide-react"

const ENTRIES = [
  {
    id: "why-i-self-host",
    date: "May 2025",
    readTime: "8 min read",
    icon: Cpu,
    category: "Homelab",
    title: "Why I Self-Host Everything — and Why You Might Want To",
    excerpt:
      "Cloud billing is a silent predator waiting to strike. After an unexpected PlanetScale database tier sunset bricked my client's app at 2:00 AM and left me with a staggering $120/month bill, I waged war against corporate cloud monopolies. I salvaged a secondhand Intel NUC, installed Proxmox, and claimed absolute sovereignty over my infrastructure. Here is the raw, unvarnished truth about self-hosting from my bedroom in Johor Bahru.",
    body: [
      {
        heading: "The 2:00 AM WhatsApp Jolt",
        text: "It is the sound every developer fears—the aggressive, rhythmic vibration of a phone against a wooden desk at 2:14 AM. A high-priority client, frantic. Their database was offline. The culprit? A silent email from a cloud database provider announcing the end of their free tier, instantly upgrading and then freezing our account. In that moment of sleep-deprived panic, resolving to pay $39/month for a simple relational database felt like a ransom. I realized then that relying on the modern cloud is renting a home where the landlord can change the locks without warning.",
      },
      {
        heading: "The Economics of Sovereignty",
        text: "Let's be brutally honest: RM conversion rates make US dollar cloud subscriptions a financial death sentence for Malaysian students. A $120/month Vercel and database bill translates to over RM 500—almost a month of groceries. I decided to build a fortress. I bought a secondhand Intel NUC for RM 600. Running 24/7 in the humid Johor heat, it draws about RM 18 of electricity a month. The initial setup was a baptism of fire, but the payoff is absolute: unlimited PostgreSQL databases, zero resource caps, and the incomparable peace of mind that my monthly bill is structurally fixed at the price of two plates of Nasi Kandar.",
      },
      {
        heading: "My Bare-Metal War Council",
        text: "The heart of my homelab is Proxmox VE running bare-metal on the NUC. Underneath its quiet hum lies a highly orchestrated micro-datacenter. I run isolated Ubuntu Server 24.04 VMs, with Docker and LXC containers segmenting my workloads. Gitea hosts my private repositories, Woodpecker CI automates my builds, and a lightweight monitoring stack of Prometheus, Loki, and Grafana captures every heartbeat. At the edge, a pfSense firewall secures the gate, while WireGuard tunnels allow me to securely SSH into my cluster from a UTM lecture hall.",
      },
      {
        heading: "The Tactical Cloud Hybrid",
        text: "I am not a luddite; the goal is not to escape the cloud, but to domesticate it. I still leverage Cloudflare's CDN for edge caching and global DDoS protection. I use Cloudflare R2 for cheap, egress-free object storage, and Supabase for real-time customer-facing client layers. But the core database and state management? They live on iron that I can physically touch. Never let a third-party API hold your codebase hostage.",
      },
    ],
    tags: ["Homelab", "Self-hosting", "DevOps", "Infrastructure"],
  },
  {
    id: "b2b-vs-b2c",
    date: "April 2025",
    readTime: "7 min read",
    icon: Globe,
    category: "Product",
    title: "Building for Businesses vs Building for Consumers — What Changes",
    excerpt:
      "Consumer apps are designed to chase dopamine; B2B systems are designed to survive absolute operational chaos. My transition from building flashy social tools to engineering rigorous, audit-heavy corporate ERPs was a brutal wake-up call in system architecture. I had to unlearn the aesthetics of vanity and embrace the unyielding reality of database transactions, role hierarchies, and relationship-driven engineering.",
    body: [
      {
        heading: "The Death of Vanity Metrics",
        text: "My early projects were consumer side-hustles. I spent sleepless nights perfecting micro-animations, color gradients, and onboarding flows, convinced that user experience was the ultimate engineering challenge. I was wrong. My first corporate B2B contract (XFitness) was a cold bucket of water. Businesses do not care if a button has a 3D glassmorphic hover effect if the membership database has N+1 query bottlenecks, or if trainer bookings drop because of concurrency conflicts. B2B is about utility, operational survival, and absolute reliability.",
      },
      {
        heading: "The Holy Grail: Append-Only Audit Trails",
        text: "In a consumer app, if a user makes a mistake, they hit 'undo' or delete the record. In a B2B system, deleting a record is an accounting crime. Every transaction, membership check-in, or payment webhook must be permanent and auditable. I learned this when a gym manager accidentally deleted a trainer's shift, causing a payroll dispute. Since that day, I never build database tables without an immutable, append-only audit_logs table. Every single insert, update, or role change is recorded with an actor ID, IP address, and a before/after JSON diff.",
      },
      {
        heading: "Schema-First Role Protections",
        text: "Retrofitting Role-Based Access Control (RBAC) into an active codebase is like trying to rebuild the engine of a plane while flying it. During my work on the TVPSS Management Information System, I naively handled access limits at the UI level. A clever student proved he could easily modify local API headers to access state-wide administration routes. It was a terrifying lesson. I now design strict role matrices into the PostgreSQL/MySQL schemas from day one, enforcing Row-Level Security (RLS) policies that verify user identity tokens at the database level before returning a single row.",
      },
      {
        heading: "The Adrenaline of Referrals",
        text: "Code is only 20% of the game. In the B2B world, your reputation is your source code. The gym owner who hired me for XFitness didn't care about my Git commit history; they cared that I answered their calls during payment gateway outages. Delivering on that trust earned me two high-ticket corporate referrals. Good engineers write clean code; elite engineers manage client anxiety, deliver on SLAs, and understand that relationships are the most scalable architecture in existence.",
      },
    ],
    tags: ["B2B", "Product", "Engineering", "Lessons Learned"],
  },
  {
    id: "nextjs-15-upgrade",
    date: "March 2025",
    readTime: "6 min read",
    icon: Terminal,
    category: "Engineering",
    title: "Upgrading to Next.js 15 in Production — What Broke, What Didn't",
    excerpt:
      "Upgrading live, high-traffic client systems to Next.js 15 and React 19 felt like performing open-heart surgery on a patient while they were running a marathon. Between the breaking shifts in asynchronous request APIs and the complete overhaul of default caching behaviors, the migration was a chaotic war of compilation warnings and deployment red-lines. Here is my tactical survival guide.",
    body: [
      {
        heading: "The Async Ingress Catastrophe",
        text: "Next.js 15 decided to make request APIs—specifically cookies(), headers(), and params—completely asynchronous. The moment I bumped the dependency version in my CMS project, the terminal exploded into a wall of red compilation errors. Every single server-rendered view and API route that read user sessions synchronously threw critical runtime faults. Refactoring this wasn't complex, but it was a grueling, mechanical war of adding await to hundreds of locations, rewriting TS interfaces, and praying that our unit tests caught every edge case.",
      },
      {
        heading: "The Caching Paradigm Shift",
        text: "For years, Next.js's silent, aggressive default caching in fetch requests was the bane of my existence. Dashboard widgets would display stale client data for hours, forcing me to litter my code with revalidatePath and no-store parameters. In Next.js 15, the default caching behavior was finally flipped to dynamic. While this resolved our stale data bugs, it introduced a new challenge: database request counts tripled overnight on our hosting servers. We had to carefully audit every static page and explicitly opt in with force-cache to protect our Postgres instances.",
      },
      {
        heading: "React 19 Actions in the Trenches",
        text: "The bright spot of the migration was React 19's form actions. Before the upgrade, managing form submission states required tracking isLoading, isError, and manual response states across forty lines of React code. Migrating our admin panel mutations to server actions combined with the new useActionState hook was a revelation. We deleted hundreds of lines of complex client state logic, replacing them with native, progressive forms that remain functional even before the JavaScript bundle completely loads.",
      },
      {
        heading: "The Upgrade Verdict",
        text: "Should you upgrade your active production stacks? If you are running static marketing pages with minimal API bindings, yes—the Turbopack compiler improvements alone will cut your build times in half. But if you are maintaining complex, multi-tenant enterprise dashboards with deeply nested dynamic layouts, budget at least three days of intensive testing. Greenfield projects, however, should start on Next.js 15 from day one; the mental model is infinitely cleaner.",
      },
    ],
    tags: ["Next.js", "React 19", "Engineering", "Migration"],
  },
  {
    id: "freelancing-malaysia",
    date: "February 2025",
    readTime: "9 min read",
    icon: BookOpen,
    category: "Career",
    title: "Freelancing as a CS Student in Malaysia — What Actually Works",
    excerpt:
      "Balancing intense university coursework at UTM while negotiating five-figure enterprise software contracts is a high-stakes balancing act that almost broke me. The Malaysian freelance market is a wild west of low-ballers, demanding SMEs, and hidden opportunities. Here is the unfiltered blueprint of how I built a thriving development business while surviving exams.",
    body: [
      {
        heading: "Where the Work Comes From",
        text: "When I started freelancing in my second year, I spent weeks cold-emailing local businesses in Johor Bahru, offering custom web apps. The conversion rate was exactly zero. Malaysian business owners do not buy software from cold emails; they buy from people they trust. I stopped pitching technology and started building relationships. My breakthrough came when I solved a simple Excel workflow bottleneck for a friend's father. That RM 500 job turned into a referral chain that eventually landed me the XFitness contract. In Malaysia, trust is the only currency that matters.",
      },
      {
        heading: "Defending Your Value",
        text: "The local SME market is notoriously price-sensitive. You will routinely encounter business owners who expect a custom, real-time inventory management platform with mobile apps for RM 1,000. Early on, I fell into the trap of discounting my rates, resulting in massive scope creep and earning less than minimum wage. I had to learn to say no. I shifted to project-based, fixed-scope pricing and stopped billing hourly. Hourly billing aligns your interests against your client's—they want you to work faster for less; you want to take your time. Enforcing professional boundaries actually increases your authority in the client's eyes.",
      },
      {
        heading: "The High-Stakes Balancing Act",
        text: "There is nothing quite like the adrenaline rush of debugging a production payment gateway error in the back of a lecture hall during a Software Construction class. Balancing commercial deadlines with academic assignments is a brutal test of discipline. I had to treat my freelance business with the same structure as a full-time job—scheduling client calls in fixed blocks, maintaining a rigorous task queue, and setting expectations early that I am unavailable during lecture hours. It is exhausting, but it beats any internship by a mile.",
      },
      {
        heading: "Build in Public, Always",
        text: "My most valuable asset isn't my degree; it's my public footprint. Every time I solve an engineering bottleneck, I write about it. I put my code on GitHub and share our architectural decisions. This journal isn't a vanity project; it is a passive lead-generation engine. The clients who actually respect and pay for high-fidelity software don't find me through freelance bidding sites—they find me through my public writings, my open-source tools, and the digital proof that I know how to build systems that scale.",
      },
    ],
    tags: ["Freelancing", "Malaysia", "Career", "Business"],
  },
]

export default function JournalPage() {
  const [expandedEntries, setExpandedEntries] = useState<Record<string, boolean>>({})

  const toggleExpand = (id: string) => {
    setExpandedEntries((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

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
                    06 / Journal
                  </span>
                  <div className="flex-1 h-px bg-zinc-900" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">
                  Notes from the Build
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-500">
                  Not a polished blog — a working journal. Thoughts on systems, infrastructure,
                  product decisions, and the raw reality of engineering real software as a student and
                  independent developer in Malaysia.
                </p>
              </div>
            </ScrollReveal>

            {/* Entries */}
            <ol className="flex flex-col gap-16">
              {ENTRIES.map((entry, i) => {
                const Icon = entry.icon
                const isExpanded = !!expandedEntries[entry.id]

                return (
                  <ScrollReveal key={entry.id} delay={i * 60}>
                    <li id={entry.id} className="scroll-mt-24 group">
                      {/* Entry header */}
                      <div className="flex items-start gap-4 mb-5">
                        <div className="shrink-0 mt-0.5 rounded-sm border border-zinc-800 bg-zinc-900 p-2 group-hover:border-zinc-600 transition-colors duration-300">
                          <Icon className="h-4 w-4 text-zinc-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 border border-zinc-800 rounded-sm px-2 py-0.5">
                              {entry.category}
                            </span>
                            <div className="flex items-center gap-1.5 text-zinc-700">
                              <Calendar className="h-3 w-3" />
                              <span className="font-mono text-[10px]">{entry.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-zinc-700">
                              <Clock className="h-3 w-3" />
                              <span className="font-mono text-[10px]">{entry.readTime}</span>
                            </div>
                          </div>
                          <h2 className="text-lg font-bold text-white tracking-tight leading-snug group-hover:text-zinc-100 transition-colors duration-300">
                            {entry.title}
                          </h2>
                        </div>
                      </div>

                      {/* Excerpt */}
                      <p className="text-sm leading-relaxed text-zinc-400 mb-5 ml-10 max-w-2xl font-light">
                        {entry.excerpt}
                      </p>

                      {/* Expanded Content with sliding animation */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          isExpanded ? "max-h-[2500px] opacity-100 mb-6" : "max-h-0 opacity-0 pointer-events-none"
                        }`}
                      >
                        {/* Body sections */}
                        <div className="ml-10 space-y-8 mb-8 mt-6">
                          {entry.body.map((section) => (
                            <div
                              key={section.heading}
                              className="border-l border-zinc-800 pl-4 hover:border-zinc-600 transition-colors duration-300"
                            >
                              <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">
                                {section.heading}
                              </h3>
                              <p className="text-sm leading-relaxed text-zinc-500 max-w-2xl font-light">
                                {section.text}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Tags */}
                        <div className="ml-10 flex flex-wrap gap-2 mb-2">
                          {entry.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="rounded-sm border border-zinc-800 bg-zinc-900 px-2.5 py-0.5 text-[10px] font-medium text-zinc-500 hover:border-zinc-700 transition-colors duration-200"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Read More / Collapse Interactive Trigger */}
                      <div className="ml-10">
                        <button
                          onClick={() => toggleExpand(entry.id)}
                          className="inline-flex items-center gap-2 rounded-sm border border-zinc-800 bg-zinc-900/40 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:border-zinc-600 hover:text-white transition-all duration-200 active:scale-95"
                        >
                          {isExpanded ? (
                            <>
                              Collapse Entry
                              <ArrowUp className="h-3 w-3" />
                            </>
                          ) : (
                            <>
                              Read more
                              <ArrowRight className="h-3 w-3" />
                            </>
                          )}
                        </button>
                      </div>

                      {/* Divider */}
                      {i < ENTRIES.length - 1 && <div className="mt-14 h-px bg-zinc-900 ml-10" />}
                    </li>
                  </ScrollReveal>
                )
              })}
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
