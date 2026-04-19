"use client";

import { ImageIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { isValidPoster, posterUrl } from "@/lib/poster";

const ACCEPTED_EXTENSIONS = ".jpg,.jpeg,.png,.webp";
const ACCEPTED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

interface ImageFieldProps {
	label: string;
	/** Existing poster path from server (for edit mode) */
	value: string | null;
	/** Called with File when user selects, null when removed */
	onChange: (file: File | null) => void;
	error?: string;
	disabled?: boolean;
}

export function ImageField({ label, value, onChange, error, disabled }: ImageFieldProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [validationError, setValidationError] = useState<string | null>(null);

	// Clean up object URL on unmount or change
	useEffect(() => {
		return () => {
			if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
		};
	}, [preview]);

	const handleFile = useCallback(
		(file: File) => {
			if (!ACCEPTED_TYPES.has(file.type)) {
				setValidationError("Supported formats: JPG, PNG, WebP");
				return;
			}

			setValidationError(null);
			setPreview(URL.createObjectURL(file));
			onChange(file);
		},
		[onChange],
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) handleFile(file);
	};

	const handleRemove = () => {
		if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
		setPreview(null);
		setValidationError(null);
		onChange(null);
		if (inputRef.current) inputRef.current.value = "";
	};

	const displayError = validationError ?? error;
	const imageUrl = preview ?? (isValidPoster(value) ? posterUrl(value) : null);

	return (
		<div className="space-y-2">
			<Label>{label}</Label>

			<input
				ref={inputRef}
				type="file"
				accept={ACCEPTED_EXTENSIONS}
				onChange={handleInputChange}
				disabled={disabled}
				className="hidden"
			/>

			{imageUrl ? (
				<div className="relative w-fit">
					<Image
						src={imageUrl}
						alt="Preview"
						width={192}
						height={192}
						unoptimized
						className="h-48 w-auto rounded-2xl border border-border object-cover"
					/>
					<Button
						type="button"
						variant="destructive"
						size="icon-sm"
						className="absolute -top-2 -right-2"
						disabled={disabled}
						onClick={handleRemove}
					>
						<Trash2Icon className="size-4" />
					</Button>
				</div>
			) : (
				<Button
					type="button"
					variant="outline"
					disabled={disabled}
					onClick={() => inputRef.current?.click()}
					className="flex h-48 w-full max-w-xs flex-col items-center justify-center gap-2 rounded-2xl border-dashed text-muted-foreground transition-colors hover:border-primary hover:text-primary"
				>
					<ImageIcon className="size-8" />
					<span className="text-sm">Click to upload</span>
					<span className="text-xs">JPG, PNG, WebP</span>
				</Button>
			)}

			{displayError && (
				<p className="text-destructive text-sm">{displayError}</p>
			)}
		</div>
	);
}
