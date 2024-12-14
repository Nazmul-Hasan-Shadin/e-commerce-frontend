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

export interface IProduct {
  id: string;
  shopId: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  inventoryCount: number;
  discount: number;
  vendorId: string;
  images: string;
}

export interface ModifiedJwtPayload {
  email: string;
  role: string;
  iat: number;
  exp: number;
}
