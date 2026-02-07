import Categories from "@/src/components/module/Home/Categories";

export const revalidate = 40; //
// https://independent-shop.vercel.app
export default async function HomePage() {
  const res = await fetch("http://localhost:3001/api/v1/category", {
    next: { revalidate: 40 },
  });

  const categoryList = await res.json();

  return <Categories categories={categoryList.data} />;
}
