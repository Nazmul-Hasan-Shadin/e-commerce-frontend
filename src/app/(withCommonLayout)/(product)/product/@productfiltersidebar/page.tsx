"use client";

import { Select, SelectItem, Divider, Input } from "@heroui/react";
import React, { forwardRef, useState } from "react";

import {
  selectBrand,
  selectCategory,
} from "@/src/redux/feature/vendor/vendor.slice";
import { useAppDispatch } from "@/src/redux/hook";
import { useGetAllCategoryQuery } from "@/src/redux/feature/admin/admin.categoryapi";
import Container from "@/src/components/ui/Container";

interface ICategory {
  id: string;
  name: string;
  images: String;
  products: [];
}


const SidebarFilter = forwardRef<HTMLDivElement>(() => {
  const { data: categoryData, isLoading } = useGetAllCategoryQuery(undefined);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleBrandChange = (brand: string) => {
    setBrands((prev) => {
      const updateBrand = prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand];

      dispatch(selectBrand(updateBrand));

      return updateBrand;
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    setCategoryName(categoryId);
    dispatch(selectCategory(categoryId));
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color]
    );
  };

  return (
    <div className={`w-full border p-4 transition-all duration-200 `}>
      <Container>
        <div className="p-2">
          {/* Brand Filter */}
          <div className="space-y-3">
            <span>Brand</span>
            <div className="flex flex-col gap-3">
              {["Pc", "Android", "Tv", "Electronics", "Hp"].map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <input
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

          {/* Category Filter */}
          <section className="border">
            <Select
              className="max-w-xs"
              isDisabled={isLoading}
              label="Select Category"
              onChange={(e) => handleCategorySelect(e.target.value)}
            >
              {categoryData?.data.length ? (
                categoryData.data.map((categoryItem: ICategory) => (
                  <SelectItem key={categoryItem.id}>
                    {categoryItem.name}
                  </SelectItem>
                ))
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
});

SidebarFilter.displayName = "SidebarFilter";

export default SidebarFilter;
