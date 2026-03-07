
import { Suspense } from "react";

import ProductsPage from "@/src/components/module/product/Products";
import { getAllProducts } from "@/src/services/products";

export default async function Page({ searchParams }: any) {

  const initialData = await getAllProducts({
    categoryName: searchParams?.categoryName || undefined,
    // brandFilter: [],
    searchTerm: searchParams?.searchTerm || undefined,
    page: searchParams?.page || 1,
  });
 

  return (
    <Suspense fallback={<h2>Loading Products...</h2>}>
      <ProductsPage initialData={initialData} />
    </Suspense>
  );
}
