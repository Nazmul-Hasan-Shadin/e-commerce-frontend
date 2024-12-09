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

export type TCategory = {
  id: string;
  name: string;
  description: string;
  images: string | null;
};
