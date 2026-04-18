import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TextFieldProps<T extends FieldValues> {
	name: Path<T>;
	label: string;
	register: UseFormRegister<T>;
	placeholder?: string;
	error?: string;
	multiline?: boolean;
	rows?: number;
}

export function TextField<T extends FieldValues>({
	name,
	label,
	register,
	placeholder,
	error,
	multiline = false,
	rows = 4,
}: TextFieldProps<T>) {
	const Component = multiline ? Textarea : Input;

	return (
		<div className="space-y-2">
			<Label htmlFor={name}>{label}</Label>
			<Component
				id={name}
				placeholder={placeholder}
				{...(multiline ? { rows } : { type: "text" })}
				{...register(name)}
			/>
			{error && <p className="text-destructive text-sm">{error}</p>}
		</div>
	);
}
