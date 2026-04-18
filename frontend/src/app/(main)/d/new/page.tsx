"use client";

import { useRouter } from "next/navigation";
import { DramaForm } from "@/components/drama/drama-form";
import { useAuth } from "@/lib/auth";
import { createDrama } from "@/lib/drama-api";
import type { DramaCreate } from "@/types/drama";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewDramaPage() {
	const router = useRouter();
	const { isOwner, token } = useAuth();

	if (!isOwner) {
		return (
			<div className="container mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
				<h1 className="font-bold text-2xl">Access Denied</h1>
				<p className="text-muted-foreground">
					You need to be logged in as the owner to add dramas.
				</p>
				<Button nativeButton={false} render={<Link href="/login" />}>
					Go to Login
				</Button>
			</div>
		);
	}

	const handleSubmit = async (data: DramaCreate) => {
		await createDrama(data, token!);
		router.push("/d");
	};

	return (
		<div className="container mx-auto max-w-2xl px-4 py-24">
			<h1 className="font-bold text-3xl">Add Drama</h1>
			<p className="mt-2 text-muted-foreground">
				Add a new drama to your watchlist.
			</p>
			<div className="mt-8">
				<DramaForm onSubmit={handleSubmit} submitLabel="Create" />
			</div>
		</div>
	);
}
