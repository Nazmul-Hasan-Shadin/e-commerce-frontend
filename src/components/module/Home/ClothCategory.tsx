"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    title: "FOR MEN",
    image:
      "https://new-ella-demo.myshopify.com/cdn/shop/files/Untitled-4_200x.jpg?v=1646822983",
    link: "/shop/men",
  },
  {
    id: 2,
    title: "FOR WOMEN",
    image:
      "https://new-ella-demo.myshopify.com/cdn/shop/files/Untitled-5_200x.jpg?v=1646822983",
    link: "/shop/women",
  },
  {
    id: 3,
    title: "FOR KIDS",
    image:
      "https://new-ella-demo.myshopify.com/cdn/shop/files/Untitled-6_200x.jpg?v=1646822983",
    link: "/shop/kids",
  },
];

const CategoryCard = () => {
  return (
    <div className="max-w-full">
      <div className=" flex items-center  gap-2 md:items-center  justify-between   md:justify-between  md:flex-row  lg:flex-col space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="">
            {/* Category Image */}
            <div className="flex flex-row-revers w-36 md:w-60 justify-around  items-center bg-white rounded-lg shadow-md md:p-2 hover:shadow-lg transition-shadow">
              <div className=" h-20 relative">
                <Image
                  src={category.image}
                  alt={category.title}
                  height={60}
                  width={70}
                  className="object-contain rounded-md w-12 h-16"
                />
              </div>

              {/* Category Details */}
              <div className=" ">
                <h3 className=" text-[10px] md:text-sm font-bold ">
                  {category.title}
                </h3>
                <a href={category.link} className="text-sm  hover:underline">
                  Shop now
                </a>
              </div>
            </div>
          </div>
        ))}
        {/* View All Categories */}

        <div className="flex hidden md:block flex-row-reverse w-60 h-20 justify-around items-center bg-white rounded-lg shadow-md md:p-2 hover:shadow-lg transition-shadow">
          view all category
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
