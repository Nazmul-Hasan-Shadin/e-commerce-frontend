"use client";
import { Checkbox } from "@nextui-org/checkbox";
import { Divider, Input } from "@nextui-org/react";
import React from "react";

const SidebarFilter = () => {
  return (
    <div className="w-full">
      <div className="  p-2">
        <div className="space-y-3">
          <span> Brand</span>
          <div className="flex flex-col  gap-3">
            <Checkbox size="sm">
              <span className="text-[#757575]">Macbook</span>
            </Checkbox>
            <Checkbox size="sm">
              <span className="text-[#757575]">Lenevo</span>
            </Checkbox>
            <Checkbox size="sm">
              <span className="text-[#757575]">Dell</span>
            </Checkbox>
            <Checkbox size="sm">
              <span className="text-[#757575]">Toshiba</span>
            </Checkbox>
            <Checkbox size="sm">
              <span className="text-[#757575]">Hp</span>
            </Checkbox>
          </div>
        </div>
        <div className=" ">
          <Divider className="my-4 w-32" />
        </div>
        {/* =========price range=============== */}

        <div className="space-y-2">
          <span className="text-lg">Price</span>
          <div className="flex gap-3">
            <Input
              placeholder="Min"
              className="w-16  border"
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
      </div>
    </div>
  );
};

export default SidebarFilter;
