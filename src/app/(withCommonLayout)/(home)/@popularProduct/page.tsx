import PopularProduct from "./PopularProduct";

export const revalidate = 60;

const PopularProductPage = async () => {
  const res = await fetch(
    `https://independent-shop.vercel.app/api/v1/product?sortBy=viewCount&orderBy=desc`,
    { next: { revalidate: 60 } }
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
