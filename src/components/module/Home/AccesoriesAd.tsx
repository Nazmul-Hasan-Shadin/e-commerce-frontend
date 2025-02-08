"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";
import discountOnCloth from "@/src/assests/accesories/disounttcloth.webp";
import Image from "next/image";
import CategoryCard from "./ClothCategory";
import Card from "../../ui/Card";
import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";
import Container from "../../ui/Container";
import SkeletonCard from "../../ui/SkeletonCard";
import { Divider } from "@nextui-org/react";
import { delay } from "framer-motion";

const AccesoriesAd = () => {
  const { data: products, isLoading, isError } = useGetAllProductQuery({});

  return (
    <Container>
      <h2 className="text-xl py-2 md:text-3xl text-black font-bold ml-3  md:ml-0   ">
        <span> Top Discount</span>
        <Divider className="bg-primary-color h-[2px] w-48 mt-3" />
      </h2>
      <div className="grid grid-cols-12  md:gap-9 w-full md:px-4">
        {/* Left Image */}
        <div className="max-w-[248px]  col-span-12 md:col-span-3 lg:col-span-2">
          <Image
            width={300}
            height={416}
            alt="Cloth discount image"
            src={discountOnCloth}
            className="rounded-md w-full md:w-[300px] md:h-[400px]"
          />
        </div>

        {/* Swiper Section */}
        <div className="col-span-12  md:col-span-9   lg:col-span-8">
          <Swiper
            slidesPerView={1}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              300: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 2,
              },
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper p-0"
          >
            {isLoading ? (
              <SwiperSlide className="flex gap-3 ">
                <h3>Loading</h3>
              </SwiperSlide>
            ) : (
              products?.data.slice(1, 4).map((product: any, index: number) => (
                <SwiperSlide key={index} className="md:p-4">
                  <Card key={product.id} product={product} />
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>

        {/* Right Section */}
        <div className="col-span-12 lg:col-span-2 overflow-scroll scrollbar-hide ">
          <div className="">
            <CategoryCard />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AccesoriesAd;
