import { MoveRight } from "lucide-react";
import { Separator } from "./ui/separator";
import { Kyrgyzstan } from "./about/kyrgyzstan";

export function About() {
	return (
		<article
			id="about"
			className="container flex flex-col justify-center min-h-screen gap-8 mx-auto snap-start py-25"
		>
			<h2 className="text-3xl text-center md:text-4xl">About Me</h2>
			<section className="flex flex-col gap-4">
				<p>
					Hi! I'm Bekzhan — an engineer inspired by every layer of the
					development process.
				</p>
				<p>
					I'm Kyrgyz from <Kyrgyzstan />. It’s a beautiful mountain-locked
					country in Central Asia known for its incredible nature and
					hospitality.
				</p>
			</section>

			<Separator />

			<section className="flex flex-col gap-4">
				<h3 className="text-xl font-bold md:text-2xl">
					Indevix (2024 <MoveRight className="inline-block" /> 2026)
				</h3>
				<ul className="flex flex-col gap-2 list-disc list-inside">
					<li>
						Worked as a Frontend Developer, contributing to both front-end and
						back-end development.
					</li>
					<li>
						Collaborated with cross-functional teams to design, develop, and
						deploy web applications.
					</li>
					<li>
						Implemented responsive UI components and optimized application
						performance.
					</li>
				</ul>
			</section>

			<Separator />

			<section className="flex flex-col gap-4">
				<h3 className="text-xl font-bold md:text-2xl">Education</h3>
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
