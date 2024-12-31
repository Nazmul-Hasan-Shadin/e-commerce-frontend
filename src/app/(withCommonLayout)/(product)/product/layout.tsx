import PageHeaderwithBanner from "@/src/components/ui/PageHeaderwithBanner";
import { ReactNode } from "react";

export default function layout({
  children,
  productfiltersidebar,
}: {
  children: ReactNode;
  productfiltersidebar: ReactNode;
}) {
  return (
    <section>
      <PageHeaderwithBanner
        bannerDescription="Explore products by category and filters."
        title="Product List"
      />
      <section className="grid grid-cols-12 justify-items- ">
        <section className="col-span-2 pl-10">{productfiltersidebar}</section>

        <main className="col-span-10">{children}</main>
      </section>
    </section>
  );
}
