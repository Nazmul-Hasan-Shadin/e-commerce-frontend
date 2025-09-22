import BottomNav from "@/src/components/module/Home/BottomNav";
import NavBar from "@/src/components/module/Home/NavBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <NavBar />
      <BottomNav />
      <main className="">{children}</main>
    </div>
  );
}
