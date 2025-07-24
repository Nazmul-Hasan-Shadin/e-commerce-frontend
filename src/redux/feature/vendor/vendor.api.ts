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

    getProductByShopId: builder.query({
      query: (shopQuery) => {
        return {
          url: `/product/shop/products/${shopQuery.shopId}`,
          method: "GET",
          params: {
            page: shopQuery.page,
          },
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

    //=========update prodcut view count based on ip userId

    updateViewCount: builder.mutation({
      query: ({id}) => {
        return {
          url: `/product/${id}/view`,
          method: "POST",
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
  useGetProductByShopIdQuery,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateViewCountMutation
} = vendorApi;
