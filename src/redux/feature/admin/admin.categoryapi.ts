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
      providesTags: ["categoryList"],
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
    deleteCategory: builder.mutation({
      query: (id) => {
        console.log("iam id ", id);

        return {
          url: `/category/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["categoryList"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
  useUpdateCategoryMutation,
  useGetCategoryByIdQuery,
  useDeleteCategoryMutation,
} = categoryApi;
