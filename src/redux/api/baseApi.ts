import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import toast from "react-hot-toast";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/api/v1",
  // baseUrl: "https://e-commerce-inky-alpha.vercel.app/api/v1",
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
    "follow",
    "shopProduct",
    "commentwithProduct",
    "categoryList",
  ],

  endpoints: (builder) => ({}),
});
