import React from "react";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@nextui-org/input";
import { IInput } from "@/src/types";
import { IoSendSharp } from "react-icons/io5";

interface IProps extends IInput {
  type?: string;
  icon?: boolean;
  placeholder?: string | undefined;
}
const FxTextArea = ({
  name,
  label,
  variant = "bordered",
  icon = false,
  placeholder,
}: IProps) => {
  const { register } = useFormContext();
  return (
    <Textarea
      {...register(name)}
      label={label}
      minRows={6}
      placeholder={placeholder}
      endContent={
        icon && (
          <button type="submit">
            <IoSendSharp className="absolute bottom-1 right-2 text-2xl text-green-600" />
          </button>
        )
      }
      className="w-full"
      variant={variant}
    />
  );
};

export default FxTextArea;
