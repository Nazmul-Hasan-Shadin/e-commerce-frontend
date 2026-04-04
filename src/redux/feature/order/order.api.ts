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
      providesTags: ["orderStatus"],
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
    getOrderItemsFromOrder: builder.query({
      query: (orderItemsId) => {
        return {
          url: `/order/orders/items/${orderItemsId}`,
          method: "GET",
        };
      },
    }),
    updateOrderStatus: builder.mutation({
      query: (payload) => {
        return {
          url: `/order/${payload.id}/status`,
          method: "PATCH",
          body: {
            status: payload.status,
          },
        };
      },
      invalidatesTags: ["orderStatus"],
    }),
  }),
});

export const {
  useGetAllOrderQuery,
  useGetOrderByIdQuery,
  useGetOrderItemsQuery,
  useUpdateOrderStatusMutation,
  useGetOrderItemsFromOrderQuery,
} = orderApi;
