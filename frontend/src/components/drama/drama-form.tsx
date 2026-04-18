"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@lib/auth";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
	ImageField,
	NumberField,
	SelectField,
	TextField,
} from "@/components/form";
import { Button } from "@/components/ui/button";
import { COUNTRIES, GENRES, STATUSES } from "@/constants/drama";
import { uploadPoster } from "@/lib/drama-api";
import type { DramaCountry, DramaCreate, DramaStatus } from "@/types/drama";
import { type DramaFormValues, dramaSchema } from "./drama-schema";

const toOptions = (items: readonly string[]) =>
	items.map((item) => ({ value: item, label: item }));

interface DramaFormProps {
	defaultValues?: Partial<DramaCreate>;
	onSubmit: (data: DramaCreate) => Promise<void>;
	submitLabel?: string;
}

const INITIAL_VALUES: Partial<DramaFormValues> = {
	title: "",
	original_title: null,
	poster_path: null,
	description: "",
	review: null,
	genres: [],
	episodes_aired: null,
	episodes_total: null,
};

export function DramaForm({
	defaultValues,
	onSubmit,
	submitLabel = "Create",
}: DramaFormProps) {
	const { token } = useAuth();
	const posterFileRef = useRef<File | null>(null);
	const [posterError, setPosterError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<DramaFormValues>({
		resolver: zodResolver(dramaSchema),
		defaultValues: { ...INITIAL_VALUES, ...defaultValues },
	});

	const handleFormSubmit = async (data: DramaFormValues) => {
		setPosterError(null);

		let posterPath = data.poster_path;

		// Upload poster if a new file was selected
		if (posterFileRef.current && token) {
			try {
				const result = await uploadPoster(posterFileRef.current, token);
				posterPath = result.poster_path;
			} catch {
				setPosterError("Failed to upload poster");
				return;
			}
		}

		await onSubmit({ ...data, poster_path: posterPath } as DramaCreate);
	};

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
			{/* Title + Original Title */}
			<div className="grid gap-6 md:grid-cols-2">
				<TextField<DramaFormValues>
					name="title"
					label="Title"
					placeholder="Drama title"
					register={register}
					error={errors.title?.message}
				/>
				<TextField<DramaFormValues>
					name="original_title"
					label="Original Title"
					placeholder="Original title in native language"
					register={register}
				/>
			</div>

			{/* Description + Review */}
			<TextField<DramaFormValues>
				name="description"
				label="Description"
				placeholder="What is this drama about?"
				multiline
				rows={4}
				register={register}
				error={errors.description?.message}
			/>
			<TextField<DramaFormValues>
				name="review"
				label="Review"
				placeholder="Your thoughts on this drama..."
				multiline
				rows={3}
				register={register}
			/>

			{/* Rating, Year, Episodes */}
			<div className="grid gap-6 md:grid-cols-4">
				<NumberField<DramaFormValues>
					name="rating"
					label="Rating"
					placeholder="Your score"
					register={register}
					error={errors.rating?.message}
					float
					min={0}
				/>
				<NumberField<DramaFormValues>
					name="year"
					label="Year"
					placeholder="Release year"
					register={register}
					error={errors.year?.message}
				/>
				<NumberField<DramaFormValues>
					name="episodes_aired"
					label="Episodes Aired"
					placeholder="Aired so far"
					register={register}
				/>
				<NumberField<DramaFormValues>
					name="episodes_total"
					label="Episodes Total"
					placeholder="Total episodes"
					register={register}
				/>
			</div>

			{/* Status + Country */}
			<div className="grid gap-6 md:grid-cols-2">
				<SelectField
					label="Status"
					placeholder="Watching status"
					options={toOptions(STATUSES)}
					value={watch("status")}
					onChange={(v) => setValue("status", v as DramaStatus)}
				/>
				<SelectField
					label="Country"
					placeholder="Country of origin"
					options={toOptions(COUNTRIES)}
					value={watch("country")}
					onChange={(v) => setValue("country", v as DramaCountry)}
				/>
			</div>

			{/* Genres */}
			<SelectField
				label="Genres"
				options={toOptions(GENRES)}
				value={watch("genres") ?? []}
				onChange={(v) => setValue("genres", v)}
				multiple
			/>

			{/* Poster */}
			<ImageField
				label="Poster"
				value={watch("poster_path") ?? null}
				onChange={(file) => {
					posterFileRef.current = file;
					if (!file) setValue("poster_path", null);
				}}
				error={posterError ?? undefined}
			/>

			<Button
				type="submit"
				disabled={isSubmitting}
				className="w-full md:w-auto"
			>
				{isSubmitting ? "Saving..." : submitLabel}
			</Button>
		</form>
	);
}
