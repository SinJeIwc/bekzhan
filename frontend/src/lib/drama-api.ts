import { api } from "@/lib/api";
import type { DramaCreate, DramaPublic } from "@/types/drama";

export function getDramas(): Promise<DramaPublic[]> {
	return api.get("dramas/").json<DramaPublic[]>();
}

export function getDrama(id: string): Promise<DramaPublic> {
	return api.get(`dramas/${id}`).json<DramaPublic>();
}

export function createDrama(
	data: DramaCreate,
	token: string,
): Promise<DramaPublic> {
	return api
		.post("dramas/", {
			json: data,
			headers: { Authorization: `Bearer ${token}` },
		})
		.json<DramaPublic>();
}

export function updateDrama(
	id: string,
	data: DramaCreate,
	token: string,
): Promise<DramaPublic> {
	return api
		.put(`dramas/${id}`, {
			json: data,
			headers: { Authorization: `Bearer ${token}` },
		})
		.json<DramaPublic>();
}

export function uploadPoster(
	file: File,
	token: string,
): Promise<{ poster_path: string }> {
	const formData = new FormData();
	formData.append("file", file);

	return api
		.post("upload/poster", {
			body: formData,
			headers: { Authorization: `Bearer ${token}` },
		})
		.json<{ poster_path: string }>();
}

export async function deleteDrama(id: string, token: string): Promise<void> {
	await api.delete(`dramas/${id}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
}
