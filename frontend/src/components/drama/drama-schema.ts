import { z } from "zod";
import { COUNTRIES, STATUSES } from "@/constants/drama";

export const dramaSchema = z.object({
	title: z.string().min(1, { error: "Title is required" }),
	original_title: z.string().nullable().optional(),
	poster_path: z.string().nullable().optional(),
	description: z.string().min(1, { error: "Description is required" }),
	review: z.string().nullable().optional(),
	rating: z.number({ error: "Rating is required" }).min(0).max(10),
	status: z.enum(STATUSES, { error: "Status is required" }),
	genres: z.array(z.string()).optional(),
	year: z.number({ error: "Year is required" }),
	episodes_aired: z.number().nullable().optional(),
	episodes_total: z.number().nullable().optional(),
	country: z.enum(COUNTRIES, { error: "Country is required" }),
});

export type DramaFormValues = z.infer<typeof dramaSchema>;
