"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { getDramas } from "@/lib/drama-api";
import type { DramaPublic } from "@/types/drama";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { PlusIcon } from "../animate-ui/icons/plus";
import { applyFilters } from "./apply-filters";
import { DramaCard } from "./drama-card";
import { DramaCardSkeleton } from "./drama-card-skeleton";
import { type DramaFiltersState, EMPTY_FILTERS } from "./drama-filter-types";
import { DramaFilters } from "./drama-filters";

const SKELETON_KEYS = Array.from({ length: 10 }, (_, i) => `skeleton-${i}`);
const GRID =
	"grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";

export function DramaList() {
	const { isOwner } = useAuth();
	const [dramas, setDramas] = useState<DramaPublic[]>([]);
	const [isFiltersFocused, setIsFiltersFocused] = useState(false);
	const [loading, setLoading] = useState(true);
	const [filters, setFilters] = useState<DramaFiltersState>(EMPTY_FILTERS);

	useEffect(() => {
		getDramas()
			.then(setDramas)
			.finally(() => setLoading(false));
	}, []);

	const filtered = useMemo(
		() => applyFilters(dramas, filters),
		[dramas, filters],
	);

	return (
		<div className="mt-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<DramaFilters
					filters={filters}
					onChange={setFilters}
					disabled={loading}
				/>
				{isOwner && (
					<AnimateIcon
						asChild
						animateOnHover
						animate={isFiltersFocused ? "default-loop" : false}
					>
						<Button
							nativeButton={false}
							onFocus={() => setIsFiltersFocused(true)}
							onBlur={() => setIsFiltersFocused(false)}
							className="shrink-0 hover:scale-105"
							disabled={loading}
							render={<Link href="/d/new" />}
						>
							<PlusIcon size={20} />
							Add Drama
						</Button>
					</AnimateIcon>
				)}
			</div>

			{loading ? (
				<div className={`mt-6 ${GRID}`}>
					{SKELETON_KEYS.map((key) => (
						<DramaCardSkeleton key={key} />
					))}
				</div>
			) : filtered.length === 0 ? (
				<p className="mt-12 text-center text-muted-foreground">
					No dramas found.
				</p>
			) : (
				<div className={`mt-6 ${GRID}`}>
					{filtered.map((drama) => (
						<DramaCard key={drama.id} drama={drama} editable={isOwner} />
					))}
				</div>
			)}
		</div>
	);
}
