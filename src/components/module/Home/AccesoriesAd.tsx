"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import discountOnCloth from "@/src/assests/accesories/disounttcloth.webp";
import Image from "next/image";
import CategoryCard from "./ClothCategory";
import Card from "../../ui/Card";
import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";
import Container from "../../ui/Container";
import SkeletonCard from "../../ui/SkeletonCard";

const AccesoriesAd = () => {
  const { data: products, isLoading, isError } = useGetAllProductQuery({});

  return (
    <Container>
      <h2 className="text-xl py-2 md:text-3xl text-black font-bold ml-3  md:ml-0   ">
        <span> Top Discount</span>
      </h2>
      <div className="grid grid-cols-12  items-center gap-8 w-full md:px-4">
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
        <div className="col-span-12 md:col-span-9  lg:col-span-8 ">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              300: {
                slidesPerView: 2,
                spaceBetween: 2,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            modules={[Pagination]}
            className="mySwiper p-0"
          >
            {isLoading ? (
              <SwiperSlide className="md:p-4 grid-cols-2 lg:grid-cols-3 ">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
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
        <div className="col-span-12 lg:col-span-2 overflow-hidden">
          <CategoryCard />
        </div>
      </div>
    </Container>
  );
};

export default AccesoriesAd;
