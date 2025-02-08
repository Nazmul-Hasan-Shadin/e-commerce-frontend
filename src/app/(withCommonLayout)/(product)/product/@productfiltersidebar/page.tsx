"use client";

import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";
import { selectCategory } from "@/src/redux/feature/vendor/vendor.slice";
import { useAppDispatch } from "@/src/redux/hook";
import { Divider, Input } from "@nextui-org/react";
import React, { useState } from "react";

const SidebarFilter = () => {
  const [categoryName, setCategory] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  // const { data: productData } = useGetAllProductQuery({ categoryName });

  console.log("I am categoryName", categoryName);

  const dispatch = useAppDispatch();

  const handleBrandChange = (brand: string) => {
    setCategory((prev) => {
      const updatedCategory = prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand];

      // Dispatch the updated category name directly here
      dispatch(selectCategory(updatedCategory));
      return updatedCategory; // Return the updated state for React
    });
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color]
    );
  };

  return (
    <div className="w-full">
      <div className="p-2">
        {/* Brand Filter */}
        <div className="space-y-3">
          <span>Brand</span>
          <div className="flex flex-col gap-3">
            {["Pc", "Android", "Tv", "Electronics", "Hp"].map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={brand}
                  checked={categoryName.includes(brand)}
                  onClick={() => handleBrandChange(brand)}
                  className="h-4 w-4 rounded border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor={brand} className="text-[#757575]">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Divider className="my-4 w-32" />

        {/* Price Range Filter */}
        <div className="space-y-2">
          <span className="text-lg">Price</span>
          <div className="flex gap-3">
            <Input
              placeholder="Min"
              className="w-16 border"
              type="number"
              size="sm"
            />
            <Input
              placeholder="Max"
              className="w-16 border"
              type="number"
              size="sm"
            />
          </div>
        </div>

        <Divider className="my-4 w-32" />

        {/* Color Filter */}
        <div className="space-y-3 mt-3">
          <span>Color</span>
          <div className="flex flex-col gap-3">
            {["Black", "Blue", "Red", "Gray", "Dark"].map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={color}
                  checked={selectedColors.includes(color)}
                  onChange={() => handleColorChange(color)}
                  className="h-4 w-4 rounded border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor={color} className="text-[#757575]">
                  {color}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;
