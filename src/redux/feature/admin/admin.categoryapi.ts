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
    getCategoryById: builder.query({
      query: (id) => {
        return {
          url: `/category/${id}`,
          method: "GET",
        };
      },
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => {
        console.log("iam id ", id);
        console.log("iam data", data);

        return {
          url: `/category/${id}`,
          method: "PUT",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
  useUpdateCategoryMutation,
  useGetCategoryByIdQuery,
} = categoryApi;
