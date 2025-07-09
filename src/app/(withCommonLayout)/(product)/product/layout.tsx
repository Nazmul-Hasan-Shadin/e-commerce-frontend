import { ReactNode } from "react";

import PageHeaderwithBanner from "@/src/components/ui/PageHeaderwithBanner";
import Container from "@/src/components/ui/Container";

export default function layout({
  children,
  productfiltersidebar,
}: {
  children: ReactNode;
  productfiltersidebar: ReactNode;
}) {
  return (
   <Container>
     <section>
      <PageHeaderwithBanner
        bannerDescription="Explore products by category and filters."
        title="Product List"
      />

      <section className="grid grid-cols-12 mt-4 2xl:mt-8 sm:grid-cols-12 2xl:grid-cols-12 mx-auto w-[96%] gap-4 2xl:gap-x-8">
        <section className="col-span-12  border sm:col-span-5 md:col-span-4 lg:col-span-3 2xl:col-span-3">
          {productfiltersidebar}
        </section>

        <main className="col-span-12 border sm:col-span-7  md:col-span-8 2xl:col-span-9 border">{children}</main>
      </section>
    </section>
   </Container>
  );
}
