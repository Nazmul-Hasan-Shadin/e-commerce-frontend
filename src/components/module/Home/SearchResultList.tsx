"use client";
import React from "react";
import Image from "next/image";
import { IProduct } from "../../ui/Card";

const SearchResultList = ({ searchResult }: { searchResult: IProduct[] }) => {
  return (
    <div className="absolute w-full mt-80 z-40 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto">
      {/* Render the search results */}
      {searchResult && searchResult.length > 0 ? (
        searchResult.map((product) => (
          <div
            key={product.id}
            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
          >
            <div className="w-12 h-12 mr-3">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={48}
                height={48}
                className="rounded"
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
