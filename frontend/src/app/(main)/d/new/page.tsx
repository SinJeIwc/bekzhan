"use client";

import { DramaBackButton } from "@components/drama/buttons/drama-back-button";
import { DramaForm } from "@components/drama/drama-form";
import { useAuth } from "@lib/auth";
import { createDrama } from "@lib/drama-api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { DramaCreate } from "@/types/drama";

export default function NewDramaPage() {
  const router = useRouter();
  const { isOwner, ready, token } = useAuth();

  useEffect(() => {
    if (ready && !isOwner) router.replace("/login");
  }, [ready, isOwner, router]);

  if (!ready || !isOwner || !token) return null;

  const handleSubmit = async (data: DramaCreate) => {
    await createDrama(data, token);
    router.push("/d");
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-24">
      <DramaBackButton href="/d" label="Back to list" />

      <h1 className="font-bold text-3xl">Add Drama</h1>
      <p className="mt-2 text-muted-foreground">
        Add a new drama to your watchlist.
      </p>
      <div className="mt-8">
        <DramaForm onSubmit={handleSubmit} submitLabel="Create" />
      </div>
    </div>
  );
}
