"use client";

import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface Option {
	value: string;
	label: string;
}

interface SingleSelectFieldProps {
	label: string;
	options: Option[];
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	error?: string;
	multiple?: false;
	disabled?: boolean;
}

interface MultiSelectFieldProps {
	label: string;
	options: Option[];
	value: string[];
	onChange: (value: string[]) => void;
	placeholder?: string;
	error?: string;
	multiple: true;
	disabled?: boolean;
}

type SelectFieldProps = SingleSelectFieldProps | MultiSelectFieldProps;

export function SelectField(props: SelectFieldProps) {
	if (props.multiple) {
		return <MultiSelect {...props} />;
	}

	return (
		<div className="space-y-2">
			<Label>{props.label}</Label>
			<Select
				value={props.value}
				onValueChange={(v) => {
					if (v !== null) props.onChange(v);
				}}
				disabled={props.disabled}
			>
				<SelectTrigger className="w-full">
					<SelectValue placeholder={props.placeholder} />
				</SelectTrigger>
				<SelectContent>
					{props.options.map((opt) => (
						<SelectItem key={opt.value} value={opt.value}>
							{opt.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{props.error && (
				<p className="text-destructive text-sm">{props.error}</p>
			)}
		</div>
	);
}

function MultiSelect({
	label,
	options,
	value,
	onChange,
	error,
	disabled,
}: MultiSelectFieldProps) {
	const toggle = (optionValue: string) => {
		const next = value.includes(optionValue)
			? value.filter((v) => v !== optionValue)
			: [...value, optionValue];
		onChange(next);
	};

	return (
		<div className="space-y-2">
			<Label>{label}</Label>
			<div className="flex flex-wrap gap-2">
				{options.map((opt) => (
					<button
						key={opt.value}
						type="button"
						disabled={disabled}
						onClick={() => toggle(opt.value)}
						className={`rounded-full border px-3 py-1 text-sm transition-colors disabled:pointer-events-none disabled:opacity-50 ${
							value.includes(opt.value)
								? "border-primary bg-primary/20 text-primary"
								: "border-border hover:border-primary/50"
						}`}
					>
						{opt.label}
					</button>
				))}
			</div>
			{error && <p className="text-destructive text-sm">{error}</p>}
		</div>
	);
}
