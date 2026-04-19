"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "../ui/search";

interface DramaSearchProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function DramaSearch({ value, onChange, disabled }: DramaSearchProps) {
  return (
    <div className="relative max-w-sm flex-1">
      <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
      <Input
        id="drama-search"
        placeholder="Search dramas..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="pl-9"
        aria-label="Search dramas"
      />
    </div>
  );
}
