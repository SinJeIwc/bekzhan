import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@components/ui/hover-card";
import { skillList } from "@constants/skill-list";
import Image from "next/image";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "./ui/separator";

export function Skills() {
	return (
		<article
			id="skills"
			className="container flex flex-col justify-center min-h-screen gap-8 mx-auto py-25 snap-start"
		>
			<h2 className="mt-8 text-3xl text-center md:text-4xl">Skills</h2>
			<section className="flex flex-wrap items-center justify-center gap-4">
				{skillList.map((skill) => (
					<HoverCard key={skill.name}>
						<HoverCardTrigger asChild>
							<a
								href={skill.url}
								target="_blank"
								className="focus-visible:outline-none focus-visible:bg-chart-2"
							>
								<Image
									src={skill.icon}
									alt={skill.name}
									width={64}
									height={64}
									className="p-2 transition-transform border rounded-md shadow-md select-none bg-card hover:scale-105 hover:border-chart-2"
								/>
							</a>
						</HoverCardTrigger>
						<HoverCardContent>
							<div className="flex justify-between gap-4">
								<Avatar>
									<AvatarImage src={skill.icon} />
									<AvatarFallback>{skill.name}</AvatarFallback>
								</Avatar>
								<div className="space-y-1">
									<a
										href={skill.url}
										target="_blank"
										className="text-sm font-semibold hover:underline"
									>
										{skill.name}
									</a>
									<p className="text-sm">{skill.description}</p>
								</div>
							</div>
						</HoverCardContent>
					</HoverCard>
				))}
			</section>

			<Separator />

			<Accordion type="single" collapsible>
				<AccordionItem value="more-skills">
					<AccordionTrigger className="text-xl font-bold focus-visible:border-0 focus-visible:ring-0 focus-visible:text-chart-2">
						More Skills
					</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-4">
						<h3 className="text-xl md:text-2xl">Programming Languages</h3>
						<p>JavaScript, TypeScript, Python</p>
						<h3 className="text-xl md:text-2xl">Technologies</h3>
						<p>React, Next.js, Git, Docker, VS Code</p>
						<h3 className="text-xl md:text-2xl">Other skills</h3>
						<p>
							English (B2), Agile Methodologies, Problem-Solving, Team
							Collaboration
						</p>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</article>
	);
}
