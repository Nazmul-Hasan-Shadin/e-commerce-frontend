"use client";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import React from "react";
import { IoGitCompareOutline } from "react-icons/io5";

const ComparePage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.compareItem.product);
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <p>Product Comparison</p>
          <p>
            Find and select products to see the differences and similarities
            between them print Print Share
          </p>
        </div>
        <div> print</div>
      </div>
    </div>
  );
};

export default ComparePage;
