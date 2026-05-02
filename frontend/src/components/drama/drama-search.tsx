"use client";

import { AnimateIcon } from "@components/animate-ui/icons/icon";
import { SearchIcon } from "@components/animate-ui/icons/search";
import { Input } from "@components/ui/input";
import { useState } from "react";

interface DramaSearchProps {
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
}

export function DramaSearch({ value, onChange, disabled }: DramaSearchProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	const isActive = isHovered || isFocused;

	return (
		<AnimateIcon
			asChild
			animate={isActive ? "find" : false}
			animation="find"
			loop
			completeOnStop
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onFocus={() => setIsFocused(true)}
			onBlur={(event) => {
				const relatedTarget = event.relatedTarget;
				if (!(relatedTarget instanceof Node)) {
					setIsFocused(false);
					return;
				}

				if (!event.currentTarget.contains(relatedTarget)) {
					setIsFocused(false);
				}
			}}
		>
			<div className="relative max-w-sm flex-1">
				<SearchIcon
					className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
					size={20}
				/>

				<Input
					id="drama-search"
					placeholder="Search dramas..."
					value={value}
					onChange={(e) => onChange(e.target.value)}
					disabled={disabled}
					className="pl-9"
					aria-label="Search dramas"
				/>
			</div>
		</AnimateIcon>
	);
}
