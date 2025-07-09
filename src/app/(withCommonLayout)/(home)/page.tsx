import Image from "next/image";

import Banner from "@/src/components/module/Home/Banner";
import FeatureProduct from "@/src/components/module/Home/FeatureProduct";
import disocuntImage from "@/src/assests/disountt.webp";
import Footer from "@/src/components/module/Home/Footer";
import TopSellProduct from "@/src/components/module/Home/TopSellProduct";
import AccesoriesAd from "@/src/components/module/Home/AccesoriesAd";
import WhyChooseUs from "@/src/components/module/Home/WhyChooseUs";
import Catagories from "@/src/components/module/Home/Catagories";

export default function Home() {
  return (
    <div>
      <Banner />

      <Catagories />

      <div className="w-3/4 mx-auto md:my-5">
        <Image
          alt="discount banner"
          className="w-full"
          height={300}
          src={disocuntImage}
          width={400}
        />
      </div>

      <FeatureProduct />
      <TopSellProduct />
      <AccesoriesAd />

      <WhyChooseUs />
      <Footer />
    </div>
  );
}
