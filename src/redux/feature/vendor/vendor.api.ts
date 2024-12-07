import { baseApi } from "../../api/baseApi";

const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productInfo) => {
        return {
          url: "/product/create-product",
          method: "POST",
          body: productInfo,
        };
      },
    }),
    getAllProduct: builder.query({
      query: (productInfo) => {
        return {
          url: "/product",
          method: "GET",
          body: productInfo,
        };
      },
    }),

    getProducsByShopId: builder.query({
      query: (shopId: string) => {
        return {
          url: `/product/shop/products/${shopId}`,
          method: "GET",
        };
      },
    }),
    createShop: builder.mutation({
      query: (shopInfo) => {
        console.log(shopInfo, "create shop from reducer");

        return {
          url: "/create-shop",
          method: "POST",
          body: shopInfo,
        };
      },
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/product/${id}`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useCreateShopMutation,
  useGetAllProductQuery,
  useGetProducsByShopIdQuery,
} = vendorApi;
