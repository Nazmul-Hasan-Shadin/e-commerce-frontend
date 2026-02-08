import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../store";

const productionUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_LOCAL_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_URL;
const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:3001/api/v1",

  // baseUrl: "https://independent-shop.vercel.app/api/v1",
  baseUrl: `${productionUrl}`,

  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

// const BaseQueryWithRefreshToken = async(args, api, extraoptions) => {
//   let result= await baseQuery(args,api,extraoptions)

//   if (result?.error?.status===404) {
//     toast.error(result?.error?.data?.message)
//  }
// };

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: [
    "post",
    "user",
    "getShopInfoById",
    "follow",
    "shopProduct",
    "commentwithProduct",
    "categoryList",
    "createShop",
  ],
  endpoints: (builder) => ({}),
});
