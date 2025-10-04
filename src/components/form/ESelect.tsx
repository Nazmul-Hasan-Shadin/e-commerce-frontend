"use client";

import { Select, SelectItem } from "@heroui/react";
import React from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  name: string;
  label: string;
  size?: "lg" | "md" | "sm";
  radius?: "sm" | "lg" | "md";
  defaultSelectedKeys?: any;

  dropDownHeading?: string;
  options: {
    id?: string | boolean;
    name?: string;
    key?: string;
    label?: string;
    value?: string;
  }[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
  defaultValue?: any;
}

const ESelect = ({
  name,
  label,
  options,
  required = false,
  disabled = false,
  defaultSelectedKeys,
  radius = "md",
  className = "",
  size = "md",
  dropDownHeading,
  defaultValue,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="mb-1 text-sm font-medium text-gray-700" htmlFor={name}>
        {required && <span className="text-red-500"> *</span>}
      </label>
      <Select
        defaultSelectedKeys={defaultSelectedKeys}
        id={name}
        label={label}
        labelPlacement="outside"
        radius={radius}
        size={size}
        {...register(name, { required })}
        className={` rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white `}
        disabled={disabled}
        errorMessage={errors[name] ? "border-red-500" : "border-gray-300"}
        value={defaultValue || ""} // Set default value
      >
        {/* <option disabled value="">
          {dropDownHeading || "select category"}
        </option> */}
        {options?.map((option, index) => {
          // Ensure proper key handling

          // console.log(option,'option');

          const optionValue = option.key ?? option.id ?? option.value;
          const optionLabel =
            option.label ?? option.name ?? String(optionValue);
          console.log(optionValue, optionLabel, "fpudk");

          return (
            // <option key={index} className="text-black" value={optionValue}>
            //   {optionLabel}
            // </option>
            <SelectItem key={optionValue}>{optionLabel}</SelectItem>
          );
        })}
      </Select>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">
          {(errors[name]?.message as string) || "This field is required"}
        </p>
      )}
    </div>
  );
};

export default ESelect;
