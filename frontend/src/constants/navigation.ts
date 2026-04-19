import type { LucideIcon } from "lucide-react";
import {
  BookIcon,
  CircleUserRoundIcon,
  CodeIcon,
  HomeIcon,
} from "lucide-react";

export type NavigationItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export const navigation: NavigationItem[] = [
  {
    title: "Home",
    url: "/#home",
    icon: HomeIcon,
  },
  {
    title: "About",
    url: "/#about",
    icon: BookIcon,
  },
  {
    title: "Skills",
    url: "/#skills",
    icon: CodeIcon,
  },
  {
    title: "Contact",
    url: "/#contact",
    icon: CircleUserRoundIcon,
  },
];
