"use client";
import "swiper/css";
import "swiper/css/pagination";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

import Card from "../../ui/Card";
import Container from "../../ui/Container";
import { HomeTitle } from "../../ui/HomeTitle";
import SkeletonCard from "../../ui/SkeletonCard";

import CategoryCard from "./ClothCategory";

import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";
import discountOnCloth from "@/src/assests/accesories/disounttcloth.webp";

const AccesoriesAd = () => {
  const { data: products, isLoading, isError } = useGetAllProductQuery({});

  return (
    <Container className="my-10">
      <HomeTitle title="Discount Product" />

      <div className="grid grid-cols-12 mt-10  md:gap-9 w-full md:px-4">
        {/* Left Image */}
        <div className="max-w-[248px] hidden lg:block md:col-span-3 lg:col-span-2">
          <Image
            alt="Cloth discount image"
            className="rounded-md w-full md:w-[300px] md:h-[400px]"
            height={416}
            src={discountOnCloth}
            width={300}
          />
        </div>

        {/* Swiper Section */}
        <div className="col-span-12  grid-cols-12   md:col-span-9 xl:col-span-7">
          <Swiper
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
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
              1500: {
                slidesPerView: 2.5,
                spaceBetween: 2,
              },
            }}
            className="mySwiper p-0"
            modules={[Pagination, Autoplay]}
            pagination={{
              clickable: true,
            }}
            slidesPerView={1}
            spaceBetween={10}
          >
            {isLoading ? (
              <SwiperSlide className="flex gap-3 ">
                <>
                  <SkeletonCard />
                </>
              </SwiperSlide>
            ) : (
              products?.data?.data
                .slice(1, 4)
                .map((product: any, index: number) => (
                  <SwiperSlide key={index} className="">
                    <Card key={product.id} product={product} />
                  </SwiperSlide>
                ))
            )}
          </Swiper>
        </div>

        {/* Right Section */}
        <div className="col-span-12 lg:col-span-3 overflow-scroll scrollbar-hide ">
          <div className="">
            <CategoryCard />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AccesoriesAd;
