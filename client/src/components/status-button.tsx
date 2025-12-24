"use client";

import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function StatusButton() {
	return (
		<div className="fixed bottom-8 right-8 z-50">
			<Popover>
				<PopoverTrigger asChild>
					<Button
						className="w-16 h-16 rounded-full bg-background border-2 border-border overflow-hidden shadow-lg focus-visible:ring-0 focus-visible:border-chart-2 focus:outline-none"
						aria-label="Show status"
					>
						<video
							autoPlay
							loop
							muted
							playsInline
							className="w-full h-full object-cover select-none "
						>
							<source src="/cat.webm" type="video/webm" />
						</video>
					</Button>
				</PopoverTrigger>
				<PopoverContent side="top" align="end" className="w-80">
					<div className="space-y-2">
						<h3 className="text-sm font-semibold">Current Status</h3>
						<p className="text-sm text-muted-foreground">
							Building & Iterating. I update the content regularly to reflect my
							latest journey and skills.
						</p>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
