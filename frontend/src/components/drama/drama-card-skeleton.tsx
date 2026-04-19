export function DramaCardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Poster area with status badge and rating */}
      <div className="relative aspect-2/3 rounded-lg bg-muted">
        <div className="absolute top-2 right-2 h-5 w-14 rounded-full bg-muted-foreground/10" />
        <div className="absolute top-2 left-2 size-8 rounded-full bg-muted-foreground/10" />
      </div>

      {/* Title */}
      <div className="mt-2 space-y-1">
        <div className="h-4 w-3/4 rounded bg-muted" />
        {/* Year · Country */}
        <div className="h-3 w-1/3 rounded bg-muted" />
        {/* Genres */}
        <div className="flex gap-1">
          <div className="h-5 w-12 rounded-full bg-muted" />
          <div className="h-5 w-16 rounded-full bg-muted" />
          <div className="h-5 w-10 rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}
