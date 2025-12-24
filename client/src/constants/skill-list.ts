export type Skill = {
  name: string;
  description: string;
  icon: string;
  url: string;
};

export const skillList: Skill[] = [
  {
    name: "Next.js",
    description: "The React Framework – created and maintained by @vercel.",
    icon: "/skills/nextjs.svg",
    url: "https://nextjs.org/",
  },
  {
    name: "React",
    description: "The library for web and native user interfaces.",
    icon: "/skills/react.svg",
    url: "https://react.dev/",
  },
  {
    name: "Shadcn UI",
    description: "A set of components built using Radix UI and Tailwind CSS.",
    icon: "/skills/shadcn.svg",
    url: "https://ui.shadcn.com/",
  },
  {
    name: "TypeScript",
    description:
      "A strongly typed programming language that builds on JavaScript.",
    icon: "/skills/typescript.svg",
    url: "https://www.typescriptlang.org/",
  },
  {
    name: "Tailwind CSS",
    description: "A utility-first CSS framework for rapid UI development.",
    icon: "/skills/tailwindcss.svg",
    url: "https://tailwindcss.com/",
  },
  {
    name: "Zustand",
    description:
      "A small, fast and scalable bearbones state-management solution.",
    icon: "/skills/zustand.svg",
    url: "https://zustand-demo.pmnd.rs/",
  },
  {
    name: "TanStack",
    description:
      "A set of powerful headless UI libraries for building web applications.",
    icon: "/skills/tanstack.svg",
    url: "https://tanstack.com/",
  },
  {
    name: "Biome",
    description: "An all-in-one code linter, formatter, and more.",
    icon: "/skills/biome.svg",
    url: "https://biomejs.dev/",
  },
  {
    name: "Motion",
    description: "A production-ready motion library for React.",
    icon: "/skills/motion.svg",
    url: "https://motion.dev/",
  },
];
