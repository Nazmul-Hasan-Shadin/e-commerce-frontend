"use server";

const productionUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_LOCAL_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_URL;

export const getAllProducts = async (filters: any) => {
  const filterquery = Object.entries(filters).filter(
    ([_, b]) => b !== undefined && b,
  );
  const finalQuery = Object.fromEntries(filterquery);
  console.log(finalQuery);

  const query = new URLSearchParams(finalQuery as any).toString();
  console.log(query, "iam urlsearparmas");

  const res = await fetch(`${productionUrl}/product?${query}`, {
    next: { revalidate: 450 },
  });

  return res.json();
};
