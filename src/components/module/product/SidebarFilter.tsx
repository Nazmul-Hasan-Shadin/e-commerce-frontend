"use client";
import { Divider, Input } from "@heroui/react";
import React, { useState } from "react";

import { selectCategory } from "@/src/redux/feature/vendor/vendor.slice";
import { useAppDispatch } from "@/src/redux/hook";

const SidebarFilter = () => {
  const [categoryName, setcategory] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  // const { data: productData } = useGetAllProductQuery({ categoryName });



  const dispatch = useAppDispatch();

  const handleBrandChange = (brand: string) => {
    setcategory((prev) => {
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
        : [...prev, color],
    );
  };

  return (
    <div className="w-full  top-16">
      <div className="p-2">
        {/* Brand Filter */}
        <div className="space-y-3">
          <span> Brand</span>
          <div className="flex flex-col gap-3">
            {["Pc", "Android", "Tv", "Electronics", "Hp"].map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <input
                  checked={categoryName.includes(brand)}
                  className="h-4 w-4 rounded border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500"
                  id={brand}
                  type="checkbox"
                  onClick={() => handleBrandChange(brand)}
                />
                <label className="text-[#757575]" htmlFor={brand}>
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Divider className="my-4 w-32" />
        </div>

        {/* Price Range Filter */}
        <div className="space-y-2">
          <span className="text-lg">Price</span>
          <div className="flex gap-3">
            <Input
              className="w-16 border"
              placeholder="Min"
              size="sm"
              type="number"
            />
            <Input
              className="w-16 border"
              placeholder="Max"
              size="sm"
              type="number"
            />
          </div>
        </div>

        <div>
          <Divider className="my-4 w-32" />
        </div>

        {/* Color Filter */}
        <div className="space-y-3 mt-3">
          <span> Color</span>
          <div className="flex flex-col gap-3">
            {["Black", "Blue", "Red", "Gray", "Dark"].map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <input
                  checked={selectedColors.includes(color)}
                  className="h-4 w-4 rounded border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500"
                  id={color}
                  type="checkbox"
                  onChange={() => handleColorChange(color)}
                />
                <label className="text-[#757575]" htmlFor={color}>
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
