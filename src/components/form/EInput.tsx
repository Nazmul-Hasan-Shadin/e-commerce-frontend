import { IInput } from "@/src/types";
import { Input } from "@nextui-org/input";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Iprops extends IInput {}
const EInput = ({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
}: Iprops) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  console.log(errors);

  return (
    <Input
      type={type}
      required={required}
      {...register(name)}
      label={label}
      size={size}
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
    />
  );
};

export default EInput;
