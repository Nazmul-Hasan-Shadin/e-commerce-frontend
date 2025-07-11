import SidebarFilter from "../(product)/product/@productfiltersidebar/page";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <section className="grid grid-cols-12 mt-4 2xl:mt-8 sm:grid-cols-12 2xl:grid-cols-12 mx-auto w-[96%] gap-4 2xl:gap-x-8">
        <section className="col-span-12  border sm:col-span-5 md:col-span-4 lg:col-span-3 2xl:col-span-3">
          <SidebarFilter />
        </section>

        <main className="col-span-12 border sm:col-span-7  md:col-span-8 2xl:col-span-9 border">
          {children}
        </main>
      </section>
    </section>
  );
}
