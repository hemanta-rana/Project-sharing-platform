import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input"

interface FormFieldProps {
  label: string;
  name: string;
  id: string;
  placeholder: string;
  required?: boolean;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  error?: string | string[];
  healperText?: string;
  textarea?: boolean;
}
export const FormField = ({
  label,
  name,
  id,
  placeholder,
  required,
  onChange,
  error,
  healperText,
  textarea,
}: FormFieldProps) => {
  return (
    <div className="space-y-2 ">
      <Label htmlFor={id}>{label}</Label>
      {textarea ? (
        <Textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={
            onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void
          }
        />
      ) : (
        <Input
          className="border-2 rounded-full w-full "
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={
            onChange as (e: React.ChangeEvent<HTMLInputElement>) => void
          }
        />
      )}

      {healperText && (
        <p className="text-xs text-muted-foreground">{healperText}</p>
      )}
      {error && (
        <p className="text-sm text-destructive">
          {Array.isArray(error) ? error.join(", ") : error}
        </p>
      )}
    </div>
  );
};
