"use server";
export const getAllProducts = async (filters: any) => {
  // "https://independent-shop.vercel.app"
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(
    `https://independent-shop.vercel.app/api/v1/product?${query}`,
    { next: { revalidate: 60 } },
  );

  return res.json();
};
