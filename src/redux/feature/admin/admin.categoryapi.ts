import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (categroyInfo) => {
        return {
          url: "/category/create-category",
          method: "POST",
          body: categroyInfo,
        };
      },
    }),
    getAllCategory: builder.query({
      query: () => {
        return {
          url: "/category",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useCreateCategoryMutation, useGetAllCategoryQuery } =
  categoryApi;
