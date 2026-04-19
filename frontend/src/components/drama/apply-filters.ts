import type { DramaPublic } from "@/types/drama";
import type { DramaFiltersState } from "./drama-filter-types";

export function applyFilters(
  dramas: DramaPublic[],
  filters: DramaFiltersState,
): DramaPublic[] {
  return dramas.filter((d) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchesTitle = d.title.toLowerCase().includes(q);
      const matchesOriginal = d.original_title?.toLowerCase().includes(q);
      if (!matchesTitle && !matchesOriginal) return false;
    }

    if (filters.status !== "all" && d.status !== filters.status) return false;

    if (filters.country !== "all" && d.country !== filters.country)
      return false;

    if (filters.yearFrom && d.year < Number(filters.yearFrom)) return false;
    if (filters.yearTo && d.year > Number(filters.yearTo)) return false;

    if (filters.ratingFrom && d.rating < Number(filters.ratingFrom))
      return false;
    if (filters.ratingTo && d.rating > Number(filters.ratingTo)) return false;

    if (filters.genres.length > 0) {
      const dramaGenres = (d.genres ?? []).map(String);
      if (!filters.genres.some((g) => dramaGenres.includes(g))) return false;
    }

    return true;
  });
}
