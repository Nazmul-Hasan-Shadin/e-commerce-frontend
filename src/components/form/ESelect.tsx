"use client";

import { Select, SelectItem } from "@heroui/react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IProps {
  name: string;
  label: string;
  size?: "lg" | "md" | "sm";
  radius?: "sm" | "lg" | "md";
  options: {
    id?: string | boolean;
    name?: string;
    key?: string;
    label?: string;
    value?: string;
  }[];
  required?: boolean;
  disabled?: boolean;
  selectionMode?: "single" | "multiple";
  className?: string;
}

const ESelect = ({
  name,
  label,
  selectionMode = "single",
  options,
  required = false,
  disabled = false,
  radius = "md",
  className = "",
  size = "md",
}: IProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="mb-1 text-sm font-medium text-black">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <Select
            variant="bordered"
            selectionMode={selectionMode}
            radius={radius}
            size={size}
            disabled={disabled}
            placeholder="Select option"
            classNames={{
              trigger: "bg-gray-200 border",
              value: "text-black",
              listbox: "bg-black text-white",
            
              popoverContent: "bg-white",
            }}
            selectedKeys={
              selectionMode === "multiple"
                ? new Set((field.value || []).map(String))
                : field.value
                  ? new Set([String(field.value)])
                  : new Set()
            }
            onSelectionChange={(keys) => {
              const selected = Array.from(keys);

              if (selectionMode === "multiple") {
                field.onChange(selected);
              } else {
                field.onChange(selected[0]);
              }
            }}
          >
            {options?.map((option) => {
              const optionValue =
                option.key ?? option.id ?? option.value ?? option.name;

              const optionLabel =
                option.label ?? option.name ?? String(optionValue);
           
              return (
                <SelectItem key={optionLabel as React.Key}>
                  {optionLabel}
                </SelectItem>
              );
            })}
          </Select>
        )}
      />

      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">
          {(errors[name]?.message as string) || "This field is required"}
        </p>
      )}
    </div>
  );
};

export default ESelect;
