import BottomNav from "@/src/components/module/Home/BottomNav";
import NavBar from "@/src/components/module/Home/NavBar";
import SubBottomNavPage from "@/src/components/module/Home/SubBottomNav";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <NavBar />
      <BottomNav />
      <SubBottomNavPage/>
      <main className="">{children}</main>
    </div>
  );
}
