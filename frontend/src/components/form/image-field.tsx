"use client";

import { ImageIcon, Trash2Icon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BASE_URL } from "@/lib/api";

const ACCEPTED_EXTENSIONS = ".jpg,.jpeg,.png,.webp";
const ACCEPTED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

interface ImageFieldProps {
	label: string;
	/** Existing poster path from server (for edit mode) */
	value: string | null;
	/** Called with File when user selects, null when removed */
	onChange: (file: File | null) => void;
	error?: string;
}

export function ImageField({ label, value, onChange, error }: ImageFieldProps) {
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
	const imageUrl = preview ?? (value ? `${BASE_URL}${value}` : null);

	return (
		<div className="space-y-2">
			<Label>{label}</Label>

			<input
				ref={inputRef}
				type="file"
				accept={ACCEPTED_EXTENSIONS}
				onChange={handleInputChange}
				className="hidden"
			/>

			{imageUrl ? (
				<div className="relative w-fit">
					<img
						src={imageUrl}
						alt="Preview"
						className="h-48 w-auto rounded-2xl border border-border object-cover"
					/>
					<Button
						type="button"
						variant="destructive"
						size="icon-sm"
						className="absolute -top-2 -right-2"
						onClick={handleRemove}
					>
						<Trash2Icon className="size-4" />
					</Button>
				</div>
			) : (
				<button
					type="button"
					onClick={() => inputRef.current?.click()}
					className="flex h-48 w-full max-w-xs flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
				>
					<ImageIcon className="size-8" />
					<span className="text-sm">Click to upload</span>
					<span className="text-xs">JPG, PNG, WebP</span>
				</button>
			)}

			{displayError && (
				<p className="text-destructive text-sm">{displayError}</p>
			)}
		</div>
	);
}
