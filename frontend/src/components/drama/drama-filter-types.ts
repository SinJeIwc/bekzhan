export interface DramaFiltersState {
  search: string;
  status: string;
  country: string;
  genres: string[];
  yearFrom: string;
  yearTo: string;
  ratingFrom: string;
  ratingTo: string;
}

export const EMPTY_FILTERS: DramaFiltersState = {
  search: "",
  status: "all",
  country: "all",
  genres: [],
  yearFrom: "",
  yearTo: "",
  ratingFrom: "",
  ratingTo: "",
};

export function activeFilterCount(filters: DramaFiltersState): number {
  let count = 0;
  if (filters.status !== "all") count++;
  if (filters.country !== "all") count++;
  if (filters.genres.length > 0) count++;
  if (filters.yearFrom || filters.yearTo) count++;
  if (filters.ratingFrom || filters.ratingTo) count++;
  return count;
}
