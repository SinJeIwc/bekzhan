import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SquarePenIcon } from "@/components/ui/square-pen";
import { BASE_URL } from "@/lib/api";
import type { DramaPublic } from "@/types/drama";

const statusColors: Record<string, string> = {
	watching: "bg-chart-2/20 text-chart-2",
	completed: "bg-green-500/20 text-green-600 dark:text-green-400",
	dropped: "bg-destructive/20 text-destructive",
	planned: "bg-muted text-muted-foreground",
};

function isValidPoster(path: string | null | undefined): path is string {
	return !!path && (path.startsWith("/uploads") || path.startsWith("http"));
}

function posterUrl(path: string): string {
	if (path.startsWith("http")) return path;
	return `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

interface DramaCardProps {
	drama: DramaPublic;
	editable?: boolean;
}

export function DramaCard({ drama, editable }: DramaCardProps) {
	const poster = isValidPoster(drama.poster_path) ? drama.poster_path : null;

	return (
		<div className="group">
			<div className="relative aspect-2/3 overflow-hidden rounded-lg border transition-all group-hover:border-chart-2 group-hover:shadow-lg">
				<Link href={`/d/${drama.id}`} className="absolute inset-0 z-0">
					{poster ? (
						<Image
							src={posterUrl(poster)}
							alt={drama.title}
							fill
							unoptimized
							className="object-cover transition-transform duration-300 group-hover:scale-105"
						/>
					) : (
						<div className="flex h-full items-center justify-center bg-muted">
							<span className="text-muted-foreground text-sm">No poster</span>
						</div>
					)}
				</Link>

				<Badge
					className={`absolute top-2 right-2 z-10 ${statusColors[drama.status] ?? ""}`}
				>
					{drama.status}
				</Badge>

				{drama.rating != null && (
					<div className="absolute top-2 left-2 z-10 flex size-8 items-center justify-center rounded-full bg-black/70 font-semibold text-sm text-white backdrop-blur-sm">
						{Math.round(drama.rating * 10) / 10}
					</div>
				)}

				{editable && (
					<Link
						href={`/d/${drama.id}/edit`}
						className="absolute right-2 bottom-2 z-10 flex size-8 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm transition-colors hover:bg-black/90"
						aria-label="Edit drama"
					>
						<SquarePenIcon />
					</Link>
				)}
			</div>

			<Link href={`/d/${drama.id}`} className="mt-2 block space-y-1">
				<h3 className="line-clamp-1 font-medium text-sm transition-colors group-hover:text-chart-2">
					{drama.original_title ? (
						<>
							<span className="group-hover:hidden">{drama.title}</span>
							<span className="hidden group-hover:inline">
								{drama.original_title}
							</span>
						</>
					) : (
						drama.title
					)}
				</h3>
				<p className="text-muted-foreground text-xs">
					{drama.year} · {drama.country}
				</p>

				{drama.genres && drama.genres.length > 0 && (
					<div className="flex flex-wrap gap-1">
						{drama.genres.map((genre) => (
							<span
								key={genre}
								className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs"
							>
								{genre}
							</span>
						))}
					</div>
				)}
			</Link>
		</div>
	);
}
