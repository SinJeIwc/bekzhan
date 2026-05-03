"use client";

import { use } from "react";
import { DramaBackButton } from "@/components/drama/buttons/drama-back-button";
import { DramaDetail } from "@/components/drama/drama-detail";
import { DramaDetailSkeleton } from "@/components/drama/drama-detail-skeleton";
import { useDrama } from "@/hooks/use-drama";
import { useAuth } from "@/lib/auth";

export default function DramaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { drama, loading, error } = useDrama(id);
  const { isOwner } = useAuth();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-24">
      <DramaBackButton href="/d" label="Back to list" />

      {loading && <DramaDetailSkeleton />}

      {error && <p className="py-12 text-center text-destructive">{error}</p>}

      {drama && <DramaDetail drama={drama} editable={isOwner} />}
    </div>
  );
}
