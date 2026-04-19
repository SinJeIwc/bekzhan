export function DramaDetailSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-8 md:flex-row">
      {/* Poster */}
      <div className="w-full shrink-0 md:w-64">
        <div className="aspect-2/3 rounded-lg bg-muted" />
      </div>

      {/* Info */}
      <div className="flex-1 space-y-6">
        {/* Title + badge */}
        <div>
          <div className="flex items-start gap-3">
            <div className="h-8 w-2/3 rounded bg-muted" />
            <div className="mt-1 h-5 w-16 rounded-full bg-muted" />
          </div>
          <div className="mt-2 h-4 w-1/3 rounded bg-muted" />
        </div>

        {/* Meta: rating / year / country / episodes */}
        <div className="flex gap-x-6 gap-y-2">
          <div className="space-y-1">
            <div className="h-3 w-10 rounded bg-muted" />
            <div className="h-6 w-12 rounded bg-muted" />
          </div>
          <div className="space-y-1">
            <div className="h-3 w-8 rounded bg-muted" />
            <div className="h-5 w-10 rounded bg-muted" />
          </div>
          <div className="space-y-1">
            <div className="h-3 w-12 rounded bg-muted" />
            <div className="h-5 w-14 rounded bg-muted" />
          </div>
          <div className="space-y-1">
            <div className="h-3 w-14 rounded bg-muted" />
            <div className="h-5 w-12 rounded bg-muted" />
          </div>
        </div>

        {/* Genres */}
        <div className="flex gap-1.5">
          <div className="h-5 w-16 rounded-full bg-muted" />
          <div className="h-5 w-20 rounded-full bg-muted" />
          <div className="h-5 w-14 rounded-full bg-muted" />
          <div className="h-5 w-18 rounded-full bg-muted" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 w-20 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-5/6 rounded bg-muted" />
          <div className="h-4 w-4/6 rounded bg-muted" />
        </div>

        {/* Review */}
        <div className="space-y-2">
          <div className="h-3 w-14 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-3/4 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
