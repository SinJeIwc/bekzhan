import { GithubIcon, type LucideIcon, MailIcon } from "lucide-react";

export type ContactItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export const contacts: ContactItem[] = [
  {
    title: "Email",
    url: "mailto:hp.arstanaliev@gmail.com",
    icon: MailIcon,
  },
  // {
  //     title: "LinkedIn",
  //     url: "",
  //     icon: LinkedinIcon
  // },
  {
    title: "GitHub",
    url: "https://github.com/SinJeIwc",
    icon: GithubIcon,
  },
];
