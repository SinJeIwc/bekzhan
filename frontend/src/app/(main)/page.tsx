import { About } from "@components/about";
import { Contact } from "@components/contact";
import { Hero } from "@components/hero";
import { Skills } from "@components/skills";

export default function Home() {
  return (
    <main className="no-scrollbar mx-auto h-screen w-[calc(100%-2rem)] snap-y snap-mandatory overflow-y-scroll scroll-smooth">
      <Hero />
      <About />
      <Skills />
      <Contact />
    </main>
  );
}
