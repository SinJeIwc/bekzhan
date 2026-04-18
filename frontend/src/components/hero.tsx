import { RotatingRoles } from "./hero/rotating-roles";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function Hero() {
	return (
		<article
			id="home"
			className="container mx-auto flex min-h-screen snap-start flex-col items-center justify-center gap-4"
		>
			<Badge className="px-4 py-5 text-sm" variant="outline">
				<span className="relative mr-2 flex h-2 w-2">
					<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-chart-2 opacity-75" />
					<span className="relative inline-flex h-2 w-2 rounded-full bg-chart-2" />
				</span>
				Available for work
			</Badge>

			<section className="flex flex-col items-center justify-center">
				<h2 className="text-center font-bold text-5xl md:text-7xl">
					Hi, I'm <span className="text-chart-2">Bekzhan</span>
				</h2>

				<RotatingRoles />
			</section>

			<div className="mt-4 flex gap-4">
				<Button
					nativeButton={false}
					className="focus-visible:ring-chart-2"
					// biome-ignore lint/a11y/useAnchorContent: children injected by Base UI render prop
					render={<a href="#about" />}
				>
					Learn More
				</Button>
				<Button
					nativeButton={false}
					variant="outline"
					className="focus-visible:ring-chart-2"
					// biome-ignore lint/a11y/useAnchorContent: children injected by Base UI render prop
					render={<a href="#projects" />}
				>
					Get in Touch
				</Button>
			</div>
		</article>
	);
}
