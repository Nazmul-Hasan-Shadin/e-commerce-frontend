"use client";
import { Input } from "@heroui/input";
import React from "react";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface Iprops extends IInput {
  defaultValue?: any;
  placeholder?: string;
}
const EInput = ({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  defaultValue,
  placeholder,

  name,
}: Iprops) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      placeholder={placeholder}
      required={required}
      type={type}
      {...register(name)}
      className=""
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
      label={label}
      size={size}
    />
  );
};

export default EInput;
