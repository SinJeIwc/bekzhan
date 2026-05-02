"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { SquarePenIcon } from "@/components/ui/square-pen";

interface DramaEditButtonProps {
	drama_id: string;
}

export function DramaEditButton({ drama_id }: DramaEditButtonProps) {
	const router = useRouter();
	return (
		<Button
			onClick={() => router.push(`/d/${drama_id}/edit`)}
			className="absolute right-2 bottom-2 z-10 flex size-8 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm transition-colors hover:bg-black/90"
			aria-label="Edit drama"
		>
			<SquarePenIcon />
		</Button>
	);
}
