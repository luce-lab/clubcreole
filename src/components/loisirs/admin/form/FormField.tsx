
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  min?: string | number;
  max?: string | number;
  required?: boolean;
  isTextarea?: boolean;
}

export const FormField = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  min,
  max,
  required = false,
  isTextarea = false
}: FormFieldProps) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      {isTextarea ? (
        <Textarea
          id={id}
          value={value}
          onChange={onChange}
          className="col-span-3"
          required={required}
        />
      ) : (
        <Input
          id={id}
          type={type}
          min={min as string}
          max={max as string}
          value={value}
          onChange={onChange}
          className="col-span-3"
          required={required}
        />
      )}
    </div>
  );
};
