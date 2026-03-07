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

    getOrderById: builder.query({
      query: (orderId) => {
        return {
          url: `/order/${orderId}`,
        };
      },
    }),
  }),
});

export const { useGetAllOrderQuery, useGetOrderByIdQuery } = orderApi;
