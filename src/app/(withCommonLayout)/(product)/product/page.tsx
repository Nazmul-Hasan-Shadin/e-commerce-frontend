import { getAllProducts } from "@/src/services/products";
import ProductsPageContent from "./Products";


export default async function Page() {
  // 🔹 Server-side fetch (SSR or ISR)
  const initialData = await getAllProducts({
    categoryName: "",
    brandFilter: [],
    searchTerm: "",
  });

  return <ProductsPageContent initialData={initialData} />;
}
