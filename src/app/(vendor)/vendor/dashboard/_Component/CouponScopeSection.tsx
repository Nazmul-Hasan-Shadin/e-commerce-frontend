import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

import ESelect from "@/src/components/form/ESelect";

const CouponScopeSection = ({
  categoryList,
  productList,
}: {
  categoryList?: any[];
  productList?: any[];
}) => {
  const { control } = useFormContext();
  const applyType = useWatch({
    control,
    name: "applyType",
  });

  console.log(categoryList, "");

  return (
    <div>
      <ESelect
        label="Apply Type"
        name="applyType"
        options={[
          {
            label: "All Product",
            id: "ALL",
          },
          { label: "Category", id: "CATEGORY" },
          { label: "Specific Products", id: "PRODUCT" },
        ]}
      />
      {applyType === "CATEGORY" && (
        <ESelect
          label="Select Categories"
          name="categoryIds"
          options={categoryList || []}
          selectionMode="multiple"
        />
      )}

      {/* PRODUCT SELECT */}
      {applyType === "PRODUCT" && (
        <ESelect
          label="Select Products"
          name="productIds"
          options={productList || []}
          selectionMode="multiple"
        />
      )}
    </div>
  );
};

export default CouponScopeSection;
