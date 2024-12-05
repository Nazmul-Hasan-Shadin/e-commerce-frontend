import NavBar from "@/src/components/module/Home/NavBar";
import Sidebar from "@/src/components/module/vendor/Sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex  gap-5">
      <div className="w-80">
        <Sidebar />
      </div>
      <main className="w-full">{children}</main>
    </div>
  );
}
