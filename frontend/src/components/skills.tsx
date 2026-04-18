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
			className="container mx-auto flex min-h-screen snap-start flex-col justify-center gap-8 py-25"
		>
			<h2 className="mt-8 text-center text-3xl md:text-4xl">Skills</h2>
			<section className="flex flex-wrap items-center justify-center gap-4">
				{skillList.map((skill) => (
					<HoverCard key={skill.name}>
						<HoverCardTrigger
							render={
								// biome-ignore lint/a11y/useAnchorContent: children injected by Base UI render prop
								<a
									href={skill.url}
									target="_blank"
									rel="noreferrer"
									className="focus-visible:bg-chart-2 focus-visible:outline-none"
								/>
							}
						>
							<Image
								src={skill.icon}
								alt={skill.name}
								width={64}
								height={64}
								className="select-none rounded-md border bg-card p-2 shadow-md transition-transform hover:scale-105 hover:border-chart-2"
							/>
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
										rel="noreferrer"
										className="font-semibold text-sm hover:underline"
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

			<Accordion>
				<AccordionItem value="more-skills">
					<AccordionTrigger className="font-bold text-xl focus-visible:border-0 focus-visible:text-chart-2 focus-visible:ring-0">
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
