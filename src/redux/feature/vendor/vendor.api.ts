import { baseApi } from "../../api/baseApi";

const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productInfo) => {
        console.log(
          productInfo,
          "iam useerInffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffo"
        );

        return {
          url: "/product/create-product",
          method: "POST",
          body: productInfo,
        };
      },
    }),
  }),
});

export const { useCreateProductMutation } = vendorApi;
