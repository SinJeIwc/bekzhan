import { About } from "@components/about";
import { Contact } from "@components/contact";
import { Hero } from "@components/hero";
import { Skills } from "@components/skills";

export default function Home() {
  return (
    <main className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth w-[calc(100%-2rem)] mx-auto no-scrollbar">
      <Hero />
      <About />
      <Skills />
      <Contact />
    </main>
  );
}
