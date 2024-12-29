"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import slidBanner1 from "@/src/assests/Banner/slideBanner1.png";
import mainBanner1 from "@/src/assests/Banner/tv.jpg";
import mainBanner2 from "@/src/assests/Banner/winter.webp";

const Banner = () => {
  return (
    <div className="grid gap-5  max-h-[67vh] p-1 lg:grid-cols-12 ">
      <div className="grid col-span-10 lg:col-span-8">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper  w-full   md:w-500  lg:w-full"
        >
          <SwiperSlide>
            <Image
              src={mainBanner1}
              alt="special discount banner"
              className="  w-full lg:w-full lg:h-4/5"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={mainBanner2}
              alt="special discount banner"
              className="  w-full lg:w-full lg:h-4/5"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* ===============disocunt =image ================== */}

      <div className="col-span-10 lg:col-span-4">
        <div className="grid grid-cols-2  lg:gap-y-20 gap-x-5 ">
          <div>
            <Image
              src={slidBanner1}
              alt="discount bannserkj"
              className="w-full h-full"
            />
          </div>
          <div>
            <Image
              src={slidBanner1}
              alt="discount bannserkj"
              className="w-full h-full"
            />
          </div>
          <div>
            <Image
              src={slidBanner1}
              alt="discount bannserkj"
              className="w-full h-full"
            />
          </div>
          <div>
            <Image
              src={slidBanner1}
              alt="discount bannserkj"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
