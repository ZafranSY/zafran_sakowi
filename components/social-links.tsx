import { Github, Linkedin, Twitter, Instagram, CodepenIcon } from "lucide-react"

const socials = [
  { icon: Github, href: "https://github.com/bchiang7", label: "GitHub" },
  { icon: Instagram, href: "https://instagram.com/bchiang7", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/bchiang7", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/in/bchiang7", label: "LinkedIn" },
  { icon: CodepenIcon, href: "https://codepen.io/bchiang7", label: "CodePen" },
]

export function SocialLinks() {
  return (
    <ul className="flex items-center gap-5" aria-label="Social media">
      {socials.map(({ icon: Icon, href, label }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-muted-foreground transition-colors duration-300 hover:text-foreground"
            aria-label={`${label} (opens in a new tab)`}
          >
            <Icon className="h-5 w-5" />
          </a>
        </li>
      ))}
    </ul>
  )
}
