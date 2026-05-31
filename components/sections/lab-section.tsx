import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Server, Cpu, HardDrive, Network, Terminal } from "lucide-react"

const labItems = [
  {
    icon: Server,
    title: "Home Server Cluster",
    description:
      "A self-hosted cluster running Proxmox VE with multiple Ubuntu Server 24.04 LTS VMs. Manages containerized workloads via Docker and LXC, with automated backups via Restic.",
    tags: ["Proxmox VE", "Ubuntu 24.04 LTS", "Docker", "LXC"],
  },
  {
    icon: Network,
    title: "Network & Security Stack",
    description:
      "pfSense firewall with VLAN segmentation isolating IoT, trusted, and lab traffic. Wireguard VPN for secure remote access to self-hosted services.",
    tags: ["pfSense", "WireGuard", "VLANs", "Cloudflare"],
  },
  {
    icon: HardDrive,
    title: "Storage & Observability",
    description:
      "TrueNAS Scale for NAS with ZFS pools providing redundancy. Full observability stack with Prometheus, Grafana dashboards, and Loki for log aggregation.",
    tags: ["TrueNAS Scale", "ZFS", "Prometheus", "Grafana", "Loki"],
  },
  {
    icon: Cpu,
    title: "CI/CD & Orchestration",
    description:
      "Self-hosted Gitea for private repos connected to Woodpecker CI pipelines. Kubernetes (k3s) cluster manages production-grade workloads on bare metal.",
    tags: ["k3s", "Gitea", "Woodpecker CI", "Helm"],
  },
]

const terminalLines = [
  { prompt: "~", cmd: "neofetch", output: null },
  { prompt: null, cmd: null, output: "OS: Ubuntu Server 24.04 LTS x86_64" },
  { prompt: null, cmd: null, output: "Host: Home Server Cluster (3 nodes)" },
  { prompt: null, cmd: null, output: "Kernel: 6.8.0-51-generic" },
  { prompt: null, cmd: null, output: "Uptime: 47 days, 12 hours, 3 mins" },
  { prompt: null, cmd: null, output: "CPU: AMD Ryzen 5 5600X (12) @ 4.600GHz" },
  { prompt: null, cmd: null, output: "Memory: 14.2GiB / 64.0GiB" },
  { prompt: null, cmd: null, output: "Disk (/): 1.2T / 8.0T (ZFS)" },
  { prompt: "~", cmd: "docker ps --format 'table {{.Names}}\\t{{.Status}}'", output: null },
  { prompt: null, cmd: null, output: "NAMES              STATUS" },
  { prompt: null, cmd: null, output: "grafana            Up 12 days" },
  { prompt: null, cmd: null, output: "prometheus         Up 12 days" },
  { prompt: null, cmd: null, output: "loki               Up 12 days" },
  { prompt: null, cmd: null, output: "gitea              Up 33 days" },
  { prompt: "~", cmd: "_", output: null },
]

export function LabSection() {
  return (
    <section
      id="the-lab"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="The Lab — homelab and DevOps"
    >
      {/* Mobile sticky heading */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen sidebar-glass px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">
          The Lab
        </h2>
      </div>

      {/* Section heading */}
      <ScrollReveal>
        <div className="mb-8 flex items-center gap-3">
          <Terminal className="h-4 w-4 text-zinc-500" />
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            /homelab — always on, always learning
          </span>
        </div>
      </ScrollReveal>

      {/* Terminal block */}
      <ScrollReveal delay={100}>
        <div className="mb-10 rounded-sm border border-zinc-800 bg-zinc-950 overflow-hidden">
          {/* Terminal chrome */}
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-zinc-700" />
            <span className="h-3 w-3 rounded-full bg-zinc-700" />
            <span className="h-3 w-3 rounded-full bg-zinc-700" />
            <span className="ml-3 font-mono text-xs text-zinc-500">
              user@homelab-cluster:~
            </span>
          </div>
          {/* Terminal body */}
          <div className="p-5 font-mono text-xs leading-6 text-zinc-400 overflow-x-auto">
            {terminalLines.map((line, i) => (
              <div key={i}>
                {line.prompt && (
                  <span>
                    <span className="text-zinc-600">user@homelab:~</span>
                    <span className="text-zinc-600">{" $ "}</span>
                    <span className="text-zinc-200">{line.cmd}</span>
                    {line.cmd === "_" && (
                      <span className="animate-pulse text-zinc-300">▊</span>
                    )}
                  </span>
                )}
                {line.output && (
                  <span className="text-zinc-500">{line.output}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Lab cards */}
      <ol className="flex flex-col gap-4">
        {labItems.map((item, i) => {
          const Icon = item.icon
          return (
            <ScrollReveal key={item.title} delay={i * 80}>
              <li className="group rounded-sm border border-zinc-800 bg-transparent p-5 transition-all duration-300 hover:border-white/80 hover:bg-zinc-900/30">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 shrink-0 rounded-sm border border-zinc-800 bg-zinc-900 p-2 group-hover:border-zinc-600 transition-colors duration-300">
                    <Icon className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-200 group-hover:text-white transition-colors duration-300 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-500 mb-3">
                      {item.description}
                    </p>
                    <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
                      {item.tags.map((tag) => (
                        <li key={tag}>
                          <Badge
                            variant="secondary"
                            className="rounded-sm bg-zinc-800 text-zinc-300 border border-zinc-700 px-3 py-1 text-xs font-medium group-hover:border-zinc-500 transition-colors duration-200"
                          >
                            {tag}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            </ScrollReveal>
          )
        })}
      </ol>
    </section>
  )
}
