import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SquarePenIcon } from "@/components/ui/square-pen";
import { STATUS_COLORS } from "@/constants/drama";
import { isValidPoster, posterUrl } from "@/lib/poster";
import type { DramaPublic } from "@/types/drama";
import { DramaDeleteButton } from "./drama-delete-button";

interface DramaDetailProps {
  drama: DramaPublic;
  editable?: boolean;
}

export function DramaDetail({ drama, editable }: DramaDetailProps) {
  const poster = isValidPoster(drama.poster_path) ? drama.poster_path : null;

  const episodes =
    drama.episodes_aired != null || drama.episodes_total != null
      ? `${drama.episodes_aired ?? "?"} / ${drama.episodes_total ?? "?"}`
      : null;

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      {/* Poster */}
      <div className="w-full shrink-0 md:w-64">
        <div className="relative aspect-2/3 overflow-hidden rounded-lg border">
          {poster ? (
            <Image
              src={posterUrl(poster)}
              alt={drama.title}
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted">
              <span className="text-muted-foreground text-sm">No poster</span>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 space-y-6">
        <div>
          <div className="flex flex-wrap items-start gap-3">
            <h1 className="font-bold text-2xl md:text-3xl">{drama.title}</h1>
            <Badge className={`mt-1 ${STATUS_COLORS[drama.status] ?? ""}`}>
              {drama.status}
            </Badge>
          </div>

          {drama.original_title && (
            <p className="mt-1 text-muted-foreground">{drama.original_title}</p>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {drama.rating != null && (
            <div>
              <span className="text-muted-foreground">Rating</span>
              <p className="font-semibold text-lg">
                {Math.round(drama.rating * 10) / 10}
                <span className="text-muted-foreground text-sm"> / 10</span>
              </p>
            </div>
          )}
          <div>
            <span className="text-muted-foreground">Year</span>
            <p className="font-medium">{drama.year}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Country</span>
            <p className="font-medium">{drama.country}</p>
          </div>
          {episodes && (
            <div>
              <span className="text-muted-foreground">Episodes</span>
              <p className="font-medium">{episodes}</p>
            </div>
          )}
        </div>

        {/* Genres */}
        {drama.genres && drama.genres.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {drama.genres.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>
        )}

        {/* Description */}
        <div>
          <h2 className="mb-2 font-semibold text-muted-foreground text-sm uppercase tracking-wide">
            Description
          </h2>
          <p className="leading-relaxed">{drama.description}</p>
        </div>

        {/* Review */}
        {drama.review && (
          <div>
            <h2 className="mb-2 font-semibold text-muted-foreground text-sm uppercase tracking-wide">
              Review
            </h2>
            <p className="leading-relaxed">{drama.review}</p>
          </div>
        )}

        {/* Actions */}
        {editable && (
          <div className="flex gap-3 pt-2">
            <Button
              nativeButton={false}
              render={<Link href={`/d/${drama.id}/edit`} />}
            >
              <SquarePenIcon />
              Edit
            </Button>
            <DramaDeleteButton dramaId={drama.id} dramaTitle={drama.title} />
          </div>
        )}
      </div>
    </div>
  );
}
