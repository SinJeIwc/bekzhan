"use client";

import { useState } from "react";
import { RangeField, SelectField } from "@/components/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { XIcon } from "@/components/ui/x";
import { COUNTRIES, GENRES, STATUSES } from "@/constants/drama";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { SlidersHorizontalIcon } from "../animate-ui/icons/sliders-horizontal";
import {
  activeFilterCount,
  type DramaFiltersState,
  EMPTY_FILTERS,
} from "./drama-filter-types";
import { DramaSearch } from "./drama-search";

const statusOptions = [
  { value: "all", label: "All statuses" },
  ...STATUSES.map((s) => ({ value: s, label: s })),
];

const countryOptions = [
  { value: "all", label: "All countries" },
  ...COUNTRIES.map((c) => ({ value: c, label: c })),
];

const genreOptions = GENRES.map((g) => ({ value: g, label: g }));

interface DramaFiltersProps {
  filters: DramaFiltersState;
  onChange: (filters: DramaFiltersState) => void;
  disabled?: boolean;
}

export function DramaFilters({
  filters,
  onChange,
  disabled,
}: DramaFiltersProps) {
  const [draft, setDraft] = useState(filters);
  const [isFiltersFocused, setIsFiltersFocused] = useState(false);
  const count = activeFilterCount(filters);

  const handleOpen = (open: boolean) => {
    if (open) setDraft(filters);
  };

  const handleApply = () => {
    onChange(draft);
  };

  const handleReset = () => {
    const reset = { ...EMPTY_FILTERS, search: filters.search };
    setDraft(reset);
    onChange(reset);
  };

  return (
    <div className="flex w-full gap-3">
      <DramaSearch
        value={filters.search}
        onChange={(v) => onChange({ ...filters, search: v })}
        disabled={disabled}
      />

      <Dialog onOpenChange={handleOpen}>
        <AnimateIcon
          asChild
          animateOnHover
          animate={isFiltersFocused ? "default-loop" : false}
          animation="default-loop"
          loop
          completeOnStop
        >
          <DialogTrigger
            disabled={disabled}
            onFocus={() => setIsFiltersFocused(true)}
            onBlur={() => setIsFiltersFocused(false)}
            className="inline-flex h-9 shrink-0 items-center gap-2 rounded-3xl border border-transparent bg-input/50 px-3 text-sm transition-colors hover:bg-input disabled:pointer-events-none disabled:opacity-50"
          >
            <SlidersHorizontalIcon size={20} />
            <span className="hidden sm:inline">Filters</span>
            {count > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                {count}
              </span>
            )}
          </DialogTrigger>
        </AnimateIcon>

        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Filters</DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                label="Status"
                placeholder="All statuses"
                options={statusOptions}
                value={draft.status}
                onChange={(v) => setDraft({ ...draft, status: v })}
              />
              <SelectField
                label="Country"
                placeholder="All countries"
                options={countryOptions}
                value={draft.country}
                onChange={(v) => setDraft({ ...draft, country: v })}
              />
            </div>

            <RangeField
              id="year"
              label="Year"
              placeholderFrom="From"
              placeholderTo="To"
              valueFrom={draft.yearFrom}
              valueTo={draft.yearTo}
              onFromChange={(v) => setDraft({ ...draft, yearFrom: v })}
              onToChange={(v) => setDraft({ ...draft, yearTo: v })}
            />

            <RangeField
              id="rating"
              label="Rating"
              placeholderFrom="Min"
              placeholderTo="Max"
              valueFrom={draft.ratingFrom}
              valueTo={draft.ratingTo}
              onFromChange={(v) => setDraft({ ...draft, ratingFrom: v })}
              onToChange={(v) => setDraft({ ...draft, ratingTo: v })}
              step="0.1"
            />

            <SelectField
              label="Genres"
              options={genreOptions}
              value={draft.genres}
              onChange={(v) => setDraft({ ...draft, genres: v })}
              multiple
            />
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={handleReset}>
              <XIcon />
              Reset
            </Button>
            <DialogClose render={<Button onClick={handleApply} />}>
              Apply filters
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
