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
          labelPlacement="outside"
          classNames={{
            label: "text-black",
           
          }}
          hideTimeZone
          showMonthAndYearPickers
          value={field.value}
          onChange={field.onChange}
          defaultValue={now(getLocalTimeZone())}
          label={label}
          variant="bordered"
        />
      )}
    />
  );
};

export default EDatePicker;
