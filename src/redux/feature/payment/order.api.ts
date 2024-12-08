import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order",
        method: "POST",
        body: orderData,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = authApi;
