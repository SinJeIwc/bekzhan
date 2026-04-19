import { BASE_URL } from "@/lib/api";

export function isValidPoster(
	path: string | null | undefined,
): path is string {
	return !!path && (path.startsWith("/uploads") || path.startsWith("http"));
}

export function posterUrl(path: string): string {
	if (path.startsWith("http")) return path;
	return `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}
