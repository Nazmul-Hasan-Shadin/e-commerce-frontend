"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  name: string;
  label: string;

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
  className = "",
  dropDownHeading,
  defaultValue,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {required && <span className="text-red-500"> *</span>}
      </label>
      <select
        id={name}
        {...register(name, { required })}
        className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
        disabled={disabled}
        defaultValue={defaultValue || ""} // Set default value
      >
        <option value="" disabled>
          {dropDownHeading || "select category"}
        </option>
        {options?.map((option, index) => {
          // Ensure proper key handling
          const optionValue =
            typeof option.key === "string" || typeof option.key === "number"
              ? option.key
              : typeof option.id === "string" || typeof option.id === "number"
                ? option.id
                : typeof option.value === "string" ||
                    typeof option.value === "number"
                  ? option.value
                  : undefined;
          const optionLabel = option.label || option.name || option.label;

          return (
            <option className="text-black" key={index} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">
          {(errors[name]?.message as string) || "This field is required"}
        </p>
      )}
    </div>
  );
};

export default ESelect;
