import PopularProduct from "./PopularProduct";

export const revalidate = 60;
const productionUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_LOCAL_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_URL;

const PopularProductPage = async () => {
  // https://independent-shop.vercel.app
  const res = await fetch(
    `${productionUrl}/product?sortBy=viewCount&orderBy=desc`,
    { next: { revalidate: 60 } },
  );

  const data = await res.json();

  return (
    <div>
      {/* অন্য অংশ */}
      <PopularProduct initialData={data} />
    </div>
  );
};

export default PopularProductPage;
