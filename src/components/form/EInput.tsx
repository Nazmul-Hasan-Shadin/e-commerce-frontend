"use client";
import { IInput } from "@/src/types";
import { Input } from "@nextui-org/input";
import React from "react";
import { useFormContext } from "react-hook-form";

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
      type={type}
      required={required}
      placeholder={placeholder}
      {...register(name)}
      label={label}
      size={size}
      className=""
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
    />
  );
};

export default EInput;
