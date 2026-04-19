"use client";

import Link from "next/link";
import { use } from "react";
import { DramaDetail } from "@/components/drama/drama-detail";
import { DramaDetailSkeleton } from "@/components/drama/drama-detail-skeleton";
import { Button } from "@/components/ui/button";
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
      <Button
        variant="ghost"
        className="mb-6"
        nativeButton={false}
        render={<Link href="/d" />}
      >
        &larr; Back to list
      </Button>

      {loading && <DramaDetailSkeleton />}

      {error && <p className="py-12 text-center text-destructive">{error}</p>}

      {drama && <DramaDetail drama={drama} editable={isOwner} />}
    </div>
  );
}
