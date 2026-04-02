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
          method: "GET",
        };
      },
    }),
    getOrderItems: builder.query({
      query: (orderItemsId) => {
        return {
          url: `/order/item/${orderItemsId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetAllOrderQuery,
  useGetOrderByIdQuery,
  useGetOrderItemsQuery,
} = orderApi;
