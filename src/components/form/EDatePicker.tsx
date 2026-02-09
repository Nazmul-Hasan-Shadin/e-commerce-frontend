import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "@heroui/react";
import { now, getLocalTimeZone } from "@internationalized/date";
const EDatePicker = ({ name, label }: { name: string; label: string }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePicker
          hideTimeZone
          showMonthAndYearPickers
          classNames={{
            label: "text-black",
          }}
          defaultValue={now(getLocalTimeZone())}
          label={label}
          labelPlacement="outside"
          value={field.value}
          variant="bordered"
          onChange={field.onChange}
        />
      )}
    />
  );
};

export default EDatePicker;
