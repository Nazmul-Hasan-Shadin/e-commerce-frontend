import React from "react";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@nextui-org/input";
import { IInput } from "@/src/types";

interface IProps extends IInput {
  type?: string;
}
const FxTextArea = ({ name, label, variant = "bordered" }: IProps) => {
  const { register } = useFormContext();
  return (
    <Textarea
      {...register(name)}
      label={label}
      minRows={6}
      className="w-full"
      variant={variant}
    />
  );
};

export default FxTextArea;
