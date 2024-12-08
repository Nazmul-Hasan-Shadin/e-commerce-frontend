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
      query: ({
        searchTerm = undefined,
        categoryName = undefined,
        isFlash = "",
      }) => {
        const params: Record<string, string> = {};

        if (searchTerm) {
          params.searchTerm = searchTerm;
        }

        if (categoryName) {
          params.categoryName = categoryName;
        }
        if (isFlash) {
          params.isFlash = isFlash;
        }

        return {
          url: `/product`,
          method: "GET",
          params: Object.keys(params).length ? params : undefined,
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
      providesTags: ["shopProduct"],
    }),

    createShop: builder.mutation({
      query: (shopInfo) => {
        return {
          url: "/shop/create-shop",
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
    deleteProduct: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["shopProduct"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useCreateShopMutation,
  useGetAllProductQuery,
  useGetProducsByShopIdQuery,
  useDeleteProductMutation,
} = vendorApi;
