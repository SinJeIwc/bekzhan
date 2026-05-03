import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { STATUS_COLORS } from "@/constants/drama";
import { isValidPoster, posterUrl } from "@/lib/poster";
import type { DramaPublic } from "@/types/drama";
import { DramaEditButton } from "./buttons/drama-edit-button";

interface DramaCardProps {
  drama: DramaPublic;
  editable?: boolean;
}

export function DramaCard({ drama, editable }: DramaCardProps) {
  const poster = isValidPoster(drama.poster_path) ? drama.poster_path : null;

  return (
    <Link href={`/d/${drama.id}`} className="group focus:outline-none">
      <div className="relative aspect-2/3 overflow-hidden rounded-lg border transition-all group-hover:border-chart-2 group-hover:shadow-lg group-focus-visible:border-chart-2 group-focus-visible:shadow-lg">
        <div className="absolute inset-0 z-0">
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
        </div>

        <Badge
          className={`absolute top-2 right-2 z-10 ${STATUS_COLORS[drama.status] ?? ""}`}
        >
          {drama.status}
        </Badge>

        {drama.rating != null && (
          <div className="absolute top-2 left-2 z-10 flex size-8 items-center justify-center rounded-full border border-white bg-chart-2 font-semibold text-sm text-white backdrop-blur-sm">
            {Math.round(drama.rating * 10) / 10}
          </div>
        )}

        {editable && <DramaEditButton drama_id={drama.id} />}
      </div>

      <div
        // href={`/d/${drama.id}`}
        className="mt-2 block space-y-1 focus:outline-none"
      >
        <h3 className="line-clamp-1 font-medium text-sm transition-colors group-hover:text-chart-2 group-focus:text-chart-2">
          {drama.original_title ? (
            <>
              <span className="group-hover:hidden group-focus-visible:hidden">
                {drama.title}
              </span>
              <span className="hidden group-hover:inline group-focus-visible:inline">
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
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
