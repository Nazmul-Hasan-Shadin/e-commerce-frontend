"use client";

import { Select, SelectItem, Divider, Input } from "@heroui/react";
import React, { useState } from "react";

import {
  selectBrand,
  selectCategory,
} from "@/src/redux/feature/vendor/vendor.slice";
import { useAppDispatch } from "@/src/redux/hook";
import { useGetAllCategoryQuery } from "@/src/redux/feature/admin/admin.categoryapi";

import { isPending } from "@reduxjs/toolkit";
import Container from "@/src/components/ui/Container";

interface ICategory {
  id: string;
  name: string;
  images: String;

  products: [];
}

const SidebarFilter = () => {
  const { data: categoryData, isLoading } = useGetAllCategoryQuery(undefined);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  // const { data: productData } = useGetAllProductQuery({ categoryName });

  const dispatch = useAppDispatch();

  const handleBrandChange = (brand: string) => {
    setBrands((prev) => {
      const updateBrand = prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand];

      // Dispatch the updated category name directly here
      dispatch(selectBrand(updateBrand));

      return updateBrand;
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    console.log(categoryId, "id");

    setCategoryName((prev) => {
      setCategoryName(categoryId);
      dispatch(selectCategory(categoryName));
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
    <div className="w-full border p-4 sticky top-16">
      <Container>
        <div className="p-2">
          {/* Brand Filter */}
          <div className="space-y-3">
            <span>Brand</span>
            {/* filter by brand name */}
            <div className="flex flex-col gap-3">
              {["Pc", "Android", "Tv", "Electronics", "Hp"].map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <input
                    // checked={categoryName.includes(brand)}
                    className="h-4 w-4 rounded border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500"
                    id={brand}
                    type="checkbox"
                    onChange={() => handleBrandChange(brand)}
                  />
                  <label className="text-[#757575]" htmlFor={brand}>
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Divider className="my-4 w-32" />

          <section className="border">
            <Select
              isDisabled={isLoading}
              className="max-w-xs"
              label="Select Category"
              onChange={(e) => handleCategorySelect(e.target.value)}
            >
              {categoryData?.data.length ? (
                categoryData.data.map((categoryItem: ICategory) => {
                  console.log(categoryItem.id);

                  return (
                    <SelectItem key={categoryItem.id}>
                      {categoryItem.name}
                    </SelectItem>
                  );
                })
              ) : (
                <SelectItem key={"f"}>No categories available</SelectItem>
              )}
            </Select>
          </section>

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

          <Divider className="my-4 w-32" />

          {/* Color Filter */}
          <div className="space-y-3 mt-3">
            <span>Color</span>
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
      </Container>
    </div>
  );
};

export default SidebarFilter;
