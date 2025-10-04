import { Input } from "@heroui/input";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {
  type?: string;
  icon?: boolean;
  placeholder?: string | undefined;
}

const FieldArray = ({ name, placeholder, icon, label }: IProps) => {
  const { register, control } = useFormContext();
  const { append, fields } = useFieldArray({ control, name: "dynamicField" });

  return (
    <div>
      {fields.map((field, index) => (
        <Input
          {...register(`specification.${index}.title`)}
          key={field.id}
          placeholder={placeholder}
        />
      ))}
    </div>
  );
};

export default FieldArray;
