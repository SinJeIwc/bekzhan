"use client";

import { ThemeTogglerButton } from "./animate-ui/components/buttons/theme-toggler";

export function ThemeButton() {
	return (
		<ThemeTogglerButton
			variant="ghost"
			direction="rtl"
			modes={["light", "dark"]}
		/>
	);
}
