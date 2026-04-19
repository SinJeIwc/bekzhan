"use client";

import { useEffect, useState } from "react";
import { getDrama } from "@/lib/drama-api";
import type { DramaPublic } from "@/types/drama";

interface UseDramaReturn {
  drama: DramaPublic | null;
  loading: boolean;
  error: string | null;
}

export function useDrama(id: string): UseDramaReturn {
  const [drama, setDrama] = useState<DramaPublic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      setLoading(true);
      setError(null);
      try {
        const data = await getDrama(id);
        if (!cancelled) setDrama(data);
      } catch {
        if (!cancelled) setError("Failed to load drama");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetch();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { drama, loading, error };
}
