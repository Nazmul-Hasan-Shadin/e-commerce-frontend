import SidebarFilter from "../(product)/product/@productfiltersidebar/page";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <section className="grid grid-cols-12 justify-items- ">
        <section className="col-span-2 pl-10">
          <SidebarFilter />
        </section>

        <main className="col-span-10">{children}</main>
      </section>
    </section>
  );
}
