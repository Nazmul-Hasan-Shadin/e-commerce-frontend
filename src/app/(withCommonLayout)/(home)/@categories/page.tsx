import Categories from "@/src/components/module/Home/Categories";

const productionUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_LOCAL_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_URL;

export const revalidate = 40; //
// https://independent-shop.vercel.app
export default async function HomePage() {
  const res = await fetch(`${productionUrl}/category`, {
    next: { revalidate: 40 },
  });

  const categoryList = await res.json();

  return <Categories categories={categoryList.data} />;
}
