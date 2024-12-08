import React from "react";

const PageHeaderwithBanner = ({
  title,
  bannerDescription,
}: {
  title: string;
  bannerDescription: string;
}) => {
  return (
    <div className="relative">
      <div className="bg-[url('/flash.jpg')] w-full h-80 bg-cover bg-center"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/50 p-4">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="max-w-lg"> {bannerDescription}</p>
      </div>

      {/* =========================filter for products========================= */}
    </div>
  );
};

export default PageHeaderwithBanner;
