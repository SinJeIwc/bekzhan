export function DramaCardSkeleton() {
	return (
		<div className="animate-pulse space-y-2">
			<div className="aspect-2/3 rounded-lg bg-muted" />
			<div className="h-4 w-3/4 rounded bg-muted" />
			<div className="h-3 w-1/2 rounded bg-muted" />
		</div>
	);
}
