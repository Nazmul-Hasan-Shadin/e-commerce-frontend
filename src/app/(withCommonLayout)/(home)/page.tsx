import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/src/config/site";
import { title, subtitle } from "@/src/components/primitives";
import { GithubIcon } from "@/src/components/icons";
import Navbar from "@/src/components/module/Home/NavBar";
import NavBar from "@/src/components/module/Home/NavBar";
import BottomNav from "@/src/components/module/Home/BottomNav";
import Banner from "@/src/components/module/Home/Banner";
import Card from "@/src/components/ui/Card";
import FeatureProduct from "@/src/components/module/Home/FeatureProduct";
import Catagories from "@/src/components/module/Home/Catagories";
import Image from "next/image";
import disocuntImage from "@/src/assests/disountt.webp";
import Footer from "@/src/components/module/Home/Footer";
import TopSellProduct from "@/src/components/module/Home/TopSellProduct";
import AccesoriesAd from "@/src/components/module/Home/AccesoriesAd";

export default function Home() {
  return (
    <div>
      <Banner />

      <Catagories />

      <div className="w-3/4 mx-auto my-5">
        <Image
          alt="discount banner"
          height={300}
          width={400}
          className="w-full"
          src={disocuntImage}
        />
      </div>

      <FeatureProduct />
      <TopSellProduct />
      <AccesoriesAd />
      <Footer />
    </div>
  );
}
