"use server";

const productionUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_LOCAL_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_URL;

export const getAllProducts = async (filters: any) => {
  // "https://independent-shop.vercel.app"
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`${productionUrl}/product?${query}`, {
    next: { revalidate: 60 },
  });

  return res.json();
};
