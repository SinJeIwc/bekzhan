"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Trash } from "@/components/animate-ui/icons/trash";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { deleteDrama } from "@/lib/drama-api";

interface DramaDeleteButtonProps {
	dramaId: string;
	dramaTitle: string;
}

export function DramaDeleteButton({
	dramaId,
	dramaTitle,
}: DramaDeleteButtonProps) {
	const router = useRouter();
	const { token } = useAuth();
	const [deleting, setDeleting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleDelete = async () => {
		if (!token) return;
		setDeleting(true);
		setError(null);
		try {
			await deleteDrama(dramaId, token);
			router.push("/d");
		} catch {
			setError("Failed to delete drama. Please try again.");
			setDeleting(false);
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger
				render={<Button variant="destructive" disabled={deleting} />}
			>
				<AnimateIcon animateOnHover asChild>
					<span className="inline-flex">
						<Trash size={16} />
					</span>
				</AnimateIcon>
				{deleting ? "Deleting..." : "Delete"}
			</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete drama</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete &ldquo;{dramaTitle}&rdquo;? This
						action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>

				{error && <p className="text-destructive text-sm">{error}</p>}

				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						variant="destructive"
						disabled={deleting}
						onClick={handleDelete}
					>
						{deleting ? "Deleting..." : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
