"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import Link from "next/link";

import Container from "../../ui/Container";
import slidBanner1 from "../../../assests/Banner/sideBanner1.jpg";
import slidBanner2 from "../../../assests/Banner/sideBanner2.jpg";

import mainBanner2 from "@/src/assests/Banner/winter.webp";
import mainBanner3 from "@/src/assests/Banner/mainbanner.webp";

const Banner = () => {
  return (
    <Container>
      <div className="grid gap-5 h-[70vh] lg:h-[65vh] p-1 lg:grid-cols-12">
        {/* ============slider of banner =========== */}
        <div className="grid col-span-12  lg:col-span-8">
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            centeredSlides={true}
            className="mySwiper sm:h-full  w-full lg:w-full"
            height={400}
            modules={[Autoplay, Pagination, Navigation]}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            spaceBetween={30}
          >
            <SwiperSlide className="border">
              <Image
                alt="special discount banner"
                className=" w-full h-full lg:w-full lg:h-full"
                src={mainBanner3}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                alt="special discount banner"
                className="  w-full h-full lg:w-full lg:h-full"
                src={mainBanner2}
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* ===============disocunt =image ================== */}

        <div className="col-span-12 border-red-500   lg:col-span-4 border">
          <div className="flex flex-col sm:flex-row md:flex-col border-4  h-full border-x-red-500 gap-1">
            <div
              className="w-full flex-1  flex flex-col justify-center p-3 lg:p-8"
              style={{
                backgroundImage: `url(${slidBanner1.src})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div>
                <h3 className="sm:text-xl font-bold">30% discount </h3>
                <Button
                  className="bg-black text-primary-50 rounded-none"
                  size="sm"
                >
                  Shop Now
                </Button>
              </div>
            </div>

            <div
              className="flex   flex-1 flex-col justify-center  items-start p-3 lg:p-8"
              style={{
                backgroundImage: `url(${slidBanner2.src})`,
                objectFit: "fill",
              }}
            >
              <div className="">
                <h3 className="sm:text-xl font-bold">
                  Neutral <span className="text-primary-color">Juice</span>
                  Offer
                </h3>

                <Link className="underline" href="/home">
                  {" "}
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
