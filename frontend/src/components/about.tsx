// import { experiences } from "@/constants/experience";
import { Kyrgyzstan } from "./about/kyrgyzstan";
// import {
// 	Carousel,
// 	CarouselContent,
// 	CarouselItem,
// 	CarouselNext,
// 	CarouselPrevious,
// } from "./ui/carousel";
import { Separator } from "./ui/separator";

export function About() {
	return (
		<article
			id="about"
			className="container mx-auto flex min-h-screen snap-start flex-col justify-center gap-4 md:gap-8 py-25"
		>
			<h2 className="text-center text-3xl md:text-4xl">About Me</h2>
			<section className="flex flex-col gap-4">
				<p>
					Hi! I'm Bekzhan — an engineer inspired by every layer of the
					development process.
				</p>
				<p>
					I'm Kyrgyz from <Kyrgyzstan />. It's a beautiful mountain-locked
					country in Central Asia known for its incredible nature and
					hospitality.
				</p>
			</section>

			<Separator />

			{/*<Carousel className="flex flex-col gap-4">
				<CarouselContent>
					{experiences.map((exp) => (
						<CarouselItem key={exp.company}>
							<div className="flex items-start justify-between gap-2">
								<h3 className="font-bold text-xl md:text-2xl">
									{exp.company}{" "}
									<span className="font-normal text-muted-foreground text-sm md:text-base">
										<br className="md:hidden" />
										{exp.date}
									</span>
								</h3>
								<div className="flex shrink-0 gap-1 pt-0.5">
									<CarouselPrevious className="static translate-none" />
									<CarouselNext className="static translate-none" />
								</div>
							</div>
							<ul className="mt-3 flex list-inside list-disc flex-col gap-2">
								{exp.bullets.map((b) => (
									<li key={b}>{b}</li>
								))}
							</ul>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>*/}

			{/*<Separator />*/}

			<section className="flex flex-col gap-4">
				<h3 className="font-bold text-xl md:text-2xl">Education</h3>
				<p>
					International Ala-Too University, St. Bishkek — Bachelor (2023 -
					Present) <br />
					<em className="text-chart-2">
						Data Analysis and Intelligent Systems
					</em>
				</p>
			</section>
		</article>
	);
}
