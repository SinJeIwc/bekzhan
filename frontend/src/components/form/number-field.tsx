import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NumberFieldProps<T extends FieldValues> {
	name: Path<T>;
	label: string;
	register: UseFormRegister<T>;
	placeholder?: string;
	error?: string;
	float?: boolean;
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
}

export function NumberField<T extends FieldValues>({
	name,
	label,
	register,
	placeholder,
	error,
	float = false,
	min,
	max,
	step,
	disabled,
}: NumberFieldProps<T>) {
	const resolvedStep = step ?? (float ? 0.1 : 1);

	return (
		<div className="space-y-2">
			<Label htmlFor={name}>{label}</Label>
			<Input
				id={name}
				type="number"
				placeholder={placeholder}
				disabled={disabled}
				step={resolvedStep}
				min={min}
				max={max}
				{...register(name, {
					setValueAs: (v: string) => {
						if (v === "") return null;
						const n = Number(v);
						return Number.isNaN(n) ? null : n;
					},
				})}
			/>
			{error && <p className="text-destructive text-sm">{error}</p>}
		</div>
	);
}
