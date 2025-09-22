"use client"; // Use client-side rendering since RTK Query is client-based

import Card from "../../ui/Card";
import SkeletonCard from "../../ui/SkeletonCard";
import Container from "../../ui/Container";
import { HomeTitle } from "../../ui/HomeTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

import { useGetFollowedShopProductQuery } from "@/src/redux/feature/vendor/vendor.api";

const FollowedShopProduct = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useGetFollowedShopProductQuery({
    sortBy: "salesCount",
    orderBy: "desc",
  });

  console.log(products, "From Your Favorite Shops");

  return (
    <Container>
      <div className="mt-10 px-1">
        <HomeTitle title="From Your Favorite Shops" />
        <Swiper
          slidesPerView={5}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
            1536: {
              slidesPerView: 5,
            },
          }}
          modules={[Pagination, Autoplay]}
        >
          <div className="grid grid-cols-2 mt-10  gap-2 sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-6 md:p-4">
            {isLoading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              products?.data.map((product: any) => (
                <SwiperSlide className="" key={product.id}>
                  <Card product={product} />
                </SwiperSlide>
              ))
            )}
          </div>
        </Swiper>
      </div>
    </Container>
  );
};

export default FollowedShopProduct;
