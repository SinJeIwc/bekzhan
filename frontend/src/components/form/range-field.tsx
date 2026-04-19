import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RangeFieldProps {
  id: string;
  label: string;
  placeholderFrom: string;
  placeholderTo: string;
  valueFrom: string;
  valueTo: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  step?: string;
}

export function RangeField({
  id,
  label,
  placeholderFrom,
  placeholderTo,
  valueFrom,
  valueTo,
  onFromChange,
  onToChange,
  step,
}: RangeFieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid grid-cols-2 gap-2">
        <Input
          id={`${id}-from`}
          type="number"
          step={step}
          placeholder={placeholderFrom}
          value={valueFrom}
          onChange={(e) => onFromChange(e.target.value)}
          aria-label={`${label} from`}
        />
        <Input
          id={`${id}-to`}
          type="number"
          step={step}
          placeholder={placeholderTo}
          value={valueTo}
          onChange={(e) => onToChange(e.target.value)}
          aria-label={`${label} to`}
        />
      </div>
    </div>
  );
}
