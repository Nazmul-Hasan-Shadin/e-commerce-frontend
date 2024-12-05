export interface IInput {
  required?: boolean;
  type?: string;
  label?: string;
  name: string;
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}
