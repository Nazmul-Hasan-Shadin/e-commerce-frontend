import BottomNav from "@/src/components/module/Home/BottomNav";
import NavBar from "@/src/components/module/Home/NavBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar></NavBar>
      <BottomNav></BottomNav>
      <main>{children}</main>

      <h3 className="text-red-500">joy bangla</h3>
    </div>
  );
}
