"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MoonIcon } from "@/components/ui/moon";
import { SunIcon } from "@/components/ui/sun";

export function ThemeButton() {
	const { setTheme, resolvedTheme } = useTheme();

	return (
		<Button
			variant="ghost"
			size="icon"
			className="relative"
			onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
		>
			<SunIcon
				size={20}
				className="scale-100 rotate-0 transition-transform duration-300 dark:scale-0 dark:-rotate-90"
			/>
			<MoonIcon
				size={20}
				className="absolute scale-0 rotate-90 transition-transform duration-300 dark:scale-100 dark:rotate-0"
			/>
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
