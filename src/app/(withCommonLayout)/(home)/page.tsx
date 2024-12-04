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

export default function Home() {
  return (
    <div>
      <Banner />

      <Card />
    </div>
  );
}
