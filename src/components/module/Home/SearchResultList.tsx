"use client";
import React from "react";
import Image from "next/image";

import { IProduct } from "../../ui/Card";

const SearchResultList = ({
  searchResult,
  dynamicStyle,
}: {
  searchResult: IProduct[];
  dynamicStyle?: string;
}) => {
  return (
    <div
      className={`absolute border ${dynamicStyle ? "-top-[204px] lg:-top-0" : ""} border-red-500  w-[98%] left-0 md:w-full mt-80 z-40 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto
    `}
    >
      {/* Render the search results */}
      {searchResult && searchResult.length > 0 ? (
        searchResult.map((product) => (
          <div
            key={product.id}
            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
          >
            <div className="w-12 h-12 mr-3">
              <Image
                alt={product.name}
                className="rounded"
                height={48}
                src={product.images[0]}
                width={48}
              />
            </div>
            <div className="text-sm text-black">{product.name}</div>
          </div>
        ))
      ) : (
        <div className="p-2 text-sm text-center text-gray-500">
          No results found
        </div>
      )}
    </div>
  );
};

export default SearchResultList;
