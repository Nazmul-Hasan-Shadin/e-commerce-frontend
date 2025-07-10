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
      query: (queryObj) => {
        const params = new URLSearchParams();

        if (queryObj) {
          for (let key in queryObj) {
            if (Array.isArray(queryObj[key])) {
              params.append(key, queryObj[key].join(","));
            } else {
              params.append(key, queryObj[key]);
            }
          }
        }

        return {
          url: `/product`,
          method: "GET",
          params: params,
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
    getProductById: builder.query({
      query: (productId: string) => {
        return {
          url: `/product/${productId}`,
          method: "GET",
        };
      },
      providesTags: ["commentwithProduct"],
    }),

    createShop: builder.mutation({
      query: (shopInfo) => {
        return {
          url: "/shop/create-shop",
          method: "POST",
          body: shopInfo,
        };
      },
      invalidatesTags: ["createShop"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/product/${id}`,
          method: "PATCH",
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
  useGetProductByIdQuery,
} = vendorApi;
