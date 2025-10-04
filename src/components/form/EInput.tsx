/* eslint-disable react/jsx-sort-props */
"use client";
import { Input } from "@heroui/react";
import React from "react";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface Iprops extends IInput {
  defaultValue?: any;
  placeholder?: string;
  radius?: "none" | "md" | "lg" | "sm";
}
const EInput = ({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  defaultValue,
  placeholder,
  radius = "sm",

  name,
}: Iprops) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      placeholder={placeholder}
      labelPlacement="outside-top"
      required={required}
      type={type}
      variant={variant}
      {...register(name)}
      className="rounded-none"
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
      label={label}
      size={size}
      radius={radius}
    />
  );
};

export default EInput;
