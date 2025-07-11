import React from "react";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@heroui/input";
import { IoSendSharp } from "react-icons/io5";

import { IInput } from "@/src/types";

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
      className=" w-full h-52"
      endContent={
        icon && (
          <button type="submit">
            <IoSendSharp className="absolute bottom-1 right-2 text-2xl text-primary-color" />
          </button>
        )
      }
      label={label}
      maxRows={50}
      minRows={10}
      placeholder={placeholder}
      variant={variant}
    />
  );
};

export default FxTextArea;
