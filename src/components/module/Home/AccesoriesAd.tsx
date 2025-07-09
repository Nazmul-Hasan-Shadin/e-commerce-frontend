"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { Divider } from "@nextui-org/react";

import Card from "../../ui/Card";
import Container from "../../ui/Container";

import CategoryCard from "./ClothCategory";

import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";
import discountOnCloth from "@/src/assests/accesories/disounttcloth.webp";

const AccesoriesAd = () => {
  const { data: products, isLoading, isError } = useGetAllProductQuery({});

  return (
    <Container className="my-10">
      <h2 className="text-xl py-2 md:text-3xl text-black font-bold ml-3  md:ml-0   ">
        <span> Top Discount</span>
        <Divider className="bg-primary-color h-[2px] w-48 mt-3" />
      </h2>
      <div className="grid grid-cols-12 mt-10  md:gap-9 w-full md:px-4">
        {/* Left Image */}
        <div className="max-w-[248px]  col-span-12 md:col-span-3 lg:col-span-2">
          <Image
            alt="Cloth discount image"
            className="rounded-md w-full md:w-[300px] md:h-[400px]"
            height={416}
            src={discountOnCloth}
            width={300}
          />
        </div>

        {/* Swiper Section */}
        <div className="col-span-12  md:col-span-9   lg:col-span-8">
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
              1024: {
                slidesPerView: 3,
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
