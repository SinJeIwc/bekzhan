export type Experience = {
	company: string;
	date: string;
	bullets: string[];
};

export const experiences: Experience[] = [
	{
		company: "Krugosvet",
		date: "Dec 2025 — Present",
		bullets: [
			"Migrated the mobile app from native Android/iOS (Kotlin + Swift) to Kotlin Multiplatform with shared code across platforms, reducing feature delivery time by ~30%.",
			"Added responsive layouts for the entire internal CRM system for phones and tablets — enabling managers to fully process orders from any device outside the office.",
			"Completely overhauled the CRM styling system and introduced dark theme support, migrating from hardcoded colors to centralized design tokens.",
			"Maintained and improved server and client components of internal products: bug fixes and feature optimization.",
		],
	},
	{
		company: "INDEVIX",
		date: "Jan 2024 — Nov 2025",
		bullets: [
			"Developed admin panel interfaces and analytics dashboards (real-time data visualization and charts) for B2B clients.",
			"Built a reusable UI component library on top of Shadcn UI and TailwindCSS, used across multiple projects — accelerating new interface development.",
			"Optimized page load performance via code splitting and data caching.",
			"Integrated frontend with backend APIs, including contract work and change coordination through FastAPI/Swagger.",
		],
	},
	{
		company: "CODIFY",
		date: "Jun 2023 — Dec 2023",
		bullets: [
			"Developed frontend for educational and internal projects, learning React and TypeScript hands-on.",
			"Built UI components and pages, working with REST APIs and core application logic.",
			"Collaborated in a team: bug fixes, improving existing screens, and implementing interfaces from design mockups.",
		],
	},
];
