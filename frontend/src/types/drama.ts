import type { components } from "@/types/api";

type DramaPublic = components["schemas"]["DramaPublic"];
type DramaCreate = components["schemas"]["DramaCreate"];
type DramaStatus = components["schemas"]["DramaStatus"];
type DramaCountry = components["schemas"]["DramaCountry"];
type DramaGenre = components["schemas"]["DramaGenre"];

export type { DramaCountry, DramaCreate, DramaGenre, DramaPublic, DramaStatus };
