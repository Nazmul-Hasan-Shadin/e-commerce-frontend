import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: (orderInfo) => {
        return {
          url: "/order",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllOrderQuery } = orderApi;
