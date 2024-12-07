"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  name: string;
  label: string;
  options: {
    key: string;
    label: string;
  }[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const ESelect = ({
  name,
  label,
  options,
  required = false,
  disabled = false,
  className = "",
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
        className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
        disabled={disabled}
      >
        <option value="" disabled>
          Select Category
        </option>
        {options?.map((option) => (
          <option key={option?.id} value={option?.id}>
            {option?.name}
          </option>
        ))}
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
