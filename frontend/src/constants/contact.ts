import { AtSignIcon } from "@/components/ui/at-sign";
import { GithubIcon } from "@/components/ui/github";
import { LinkedinIcon } from "@/components/ui/linkedin";

export type ContactItem = {
  title: string;
  url: string;
  icon: React.FC<React.HTMLAttributes<HTMLDivElement>>;
};

export const contacts: ContactItem[] = [
  {
    title: "Email",
    url: "mailto:hp.arstanaliev@gmail.com",
    icon: AtSignIcon,
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/bekzhan-arstanaliev-312654381/",
    icon: LinkedinIcon,
  },
  {
    title: "GitHub",
    url: "https://github.com/SinJeIwc",
    icon: GithubIcon,
  },
];
