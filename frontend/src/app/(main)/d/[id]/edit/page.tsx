"use client";

import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { DramaBackButton } from "@/components/drama/buttons/drama-back-button";
import { DramaForm } from "@/components/drama/drama-form";
import { useDrama } from "@/hooks/use-drama";
import { useAuth } from "@/lib/auth";
import { updateDrama } from "@/lib/drama-api";
import type { DramaCreate } from "@/types/drama";

export default function EditDramaPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);
	const router = useRouter();
	const { isOwner, ready, token } = useAuth();
	const { drama, loading, error } = useDrama(id);

	useEffect(() => {
		if (ready && !isOwner) router.replace("/login");
	}, [ready, isOwner, router]);

	if (!ready || !isOwner || !token) return null;

	const handleSubmit = async (data: DramaCreate) => {
		await updateDrama(id, data, token);
		router.push(`/d/${id}`);
	};

	return (
		<div className="container mx-auto max-w-2xl px-4 py-24">
			<DramaBackButton href={`/d/${id}`} label="Back to details" />

			<h1 className="font-bold text-3xl">Edit Drama</h1>
			<p className="mt-2 text-muted-foreground">
				{drama ? `Editing \u201c${drama.title}\u201d` : "Loading drama..."}
			</p>

			{error && <p className="py-12 text-center text-destructive">{error}</p>}

			<div className="mt-8">
				<DramaForm
					key={drama ? drama.id : "loading"}
					defaultValues={drama ?? undefined}
					onSubmit={handleSubmit}
					submitLabel="Save changes"
					disabled={loading}
				/>
			</div>
		</div>
	);
}
