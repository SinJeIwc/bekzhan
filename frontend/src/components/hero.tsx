import Link from "next/link";
import { RotatingRoles } from "./hero/rotating-roles";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { FileTextIcon } from "./ui/file-text";

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
				<Link
					href="https://docs.google.com/document/d/1m9ds9CU6ErHa1MvcanE1eJGusjdiUT2biYW-Ok6hNvs/edit?usp=sharing"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex h-9 items-center justify-center gap-1.5 rounded-4xl border border-border bg-background px-3 text-sm font-medium whitespace-nowrap transition-all hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-chart-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
				>
					<FileTextIcon />
					Resume
				</Link>
				<Button
					nativeButton={false}
					variant="outline"
					className="focus-visible:ring-chart-2"
					// biome-ignore lint/a11y/useAnchorContent: children injected by Base UI render prop
					render={<a href="#contact" />}
				>
					Get in Touch
				</Button>
			</div>
		</article>
	);
}
