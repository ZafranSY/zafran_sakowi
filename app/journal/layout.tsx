import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Journal | Zafran Sakowi",
  description:
    "Dev journal — thoughts on systems engineering, B2B product development, homelab infrastructure, and working as an independent developer in Malaysia.",
}

export default function JournalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
