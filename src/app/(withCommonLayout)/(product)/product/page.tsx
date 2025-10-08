// page.tsx
import { Suspense } from "react";

import ProductsPage from "@/src/components/module/product/Products";
import { getAllProducts } from "@/src/services/products";

export default async function Page() {
  const initialData = await getAllProducts({
    categoryName: "",
    brandFilter: [],
    searchTerm: "",
  });

  return (
    <Suspense fallback={<h2>Loading Products...</h2>}>
      <ProductsPage initialData={initialData} />
    </Suspense>
  );
}
