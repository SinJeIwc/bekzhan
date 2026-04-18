"use client";

import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function StatusButton() {
	return (
		<div className="fixed right-8 bottom-8 z-50">
			<Popover>
				<PopoverTrigger
					render={
						<Button
							className="h-16 w-16 p-1 overflow-hidden rounded-full border-2 border-border bg-background shadow-lg hover:bg-accent hover:border-chart-2 focus:outline-none focus-visible:border-chart-2 focus-visible:ring-0"
							aria-label="Show status"
						/>
					}
				>
					<video
						autoPlay
						loop
						muted
						playsInline
						className="h-full w-full select-none object-cover"
					>
						<source src="/cat.webm" type="video/webm" />
					</video>
				</PopoverTrigger>
				<PopoverContent side="top" align="end" className="w-80">
					<div className="space-y-2">
						<h3 className="font-semibold text-sm">Current Status</h3>
						<p className="text-muted-foreground text-sm">
							Building & Iterating. I update the content regularly to reflect my
							latest journey and skills.
						</p>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
