import { HomeIcon, BookIcon, CodeIcon, CircleUserRoundIcon } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type NavigationItem = {
  title: string
  url: string
  icon: LucideIcon
}

export const navigation: NavigationItem[] = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "About",
    url: "#about",
    icon: BookIcon,
  },
  {
    title: "Skills",
    url: "#skills",
    icon: CodeIcon,
  },
  {
    title: "Contact",
    url: "#contact",
    icon: CircleUserRoundIcon,
  },
]
