import BottomNav from "@/src/components/module/Home/BottomNav";
import Footer from "@/src/components/module/Home/Footer";
import NavBar from "@/src/components/module/Home/NavBar";
import SubBottomNavPage from "@/src/components/module/Home/SubBottomNav";
import WhyChooseUs from "@/src/components/module/Home/WhyChooseUs";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <NavBar />
      <BottomNav />
      <SubBottomNavPage />

      <main className="">{children}</main>
      <WhyChooseUs />
      <Footer />
    </div>
  );
}
