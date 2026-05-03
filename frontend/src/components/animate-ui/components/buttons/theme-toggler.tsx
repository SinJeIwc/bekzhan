"use client";

import { MoonIcon } from "@components/animate-ui/icons/moon";
import { SunIcon } from "@components/animate-ui/icons/sun";
import type { VariantProps } from "class-variance-authority";
import { useTheme } from "next-themes";
import type * as React from "react";
import { buttonVariants } from "@/components/animate-ui/components/buttons/icon";
import {
	type Resolved,
	type ThemeSelection,
	ThemeToggler as ThemeTogglerPrimitive,
	type ThemeTogglerProps as ThemeTogglerPrimitiveProps,
} from "@/components/animate-ui/primitives/effects/theme-toggler";
import { cn } from "@/lib/utils";
import { AnimateIcon } from "../../icons/icon";

const getNextTheme = (
	effective: ThemeSelection,
	modes: ThemeSelection[],
): ThemeSelection => {
	const i = modes.indexOf(effective);
	if (i === -1) return modes[0];
	return modes[(i + 1) % modes.length];
};

type ThemeTogglerButtonProps = React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		modes?: ThemeSelection[];
		onImmediateChange?: ThemeTogglerPrimitiveProps["onImmediateChange"];
		direction?: ThemeTogglerPrimitiveProps["direction"];
	};

function ThemeTogglerButton({
	variant = "default",
	size = "default",
	modes = ["light", "dark", "system"],
	direction = "ltr",
	onImmediateChange,
	onClick,
	className,
	...props
}: ThemeTogglerButtonProps) {
	const { theme, resolvedTheme, setTheme } = useTheme();

	return (
		<ThemeTogglerPrimitive
			theme={theme as ThemeSelection}
			resolvedTheme={resolvedTheme as Resolved}
			setTheme={setTheme}
			direction={direction}
			onImmediateChange={onImmediateChange}
		>
			{({ effective, toggleTheme }) => (
				<AnimateIcon animateOnHover animateOnTap animateOnView>
					<button
						data-slot="theme-toggler-button"
						className={cn(
							buttonVariants({ variant, size, className }),
							"relative",
						)}
						onClick={(e) => {
							onClick?.(e);
							toggleTheme(getNextTheme(effective, modes));
						}}
						{...props}
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
					</button>
				</AnimateIcon>
			)}
		</ThemeTogglerPrimitive>
	);
}

export { ThemeTogglerButton, type ThemeTogglerButtonProps };
