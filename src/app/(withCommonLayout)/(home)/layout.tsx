import NavBar from "@/src/components/module/Home/NavBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
