import { RotatingRoles } from "./hero/rotating-roles";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <article
      id="home"
      className="container flex flex-col items-center justify-center min-h-screen gap-4 mx-auto snap-start"
    >
      <Badge className="px-4 py-2 text-sm" variant="outline">
        <span className="relative flex w-2 h-2 mr-2">
          <span className="absolute inline-flex w-full h-full bg-chart-2 rounded-full opacity-75 animate-ping" />
          <span className="relative inline-flex w-2 h-2 bg-chart-2 rounded-full" />
        </span>
        Available for work
      </Badge>

      <section className="flex flex-col items-center justify-center">
        <h2 className="text-5xl font-bold text-center md:text-7xl">
          Hi, I'm <span className="text-chart-2">Bekzhan</span>
        </h2>

        <RotatingRoles />
      </section>

      <div className="flex gap-4 mt-4">
        <Button
          className="focus-visible:ring-chart-2"
          render={<a href="#about" />}
        >
          Learn More
        </Button>
        <Button
          variant="outline"
          className="focus-visible:ring-chart-2"
          render={<a href="#projects" />}
        >
          Get in Touch
        </Button>
      </div>
    </article>
  );
}
