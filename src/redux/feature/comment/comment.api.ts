import { baseApi } from "../../api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (commentData) => ({
        url: "/review",
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: ["commentwithProduct"],
    }),

    getReviewById: builder.query({
      query: () => ({
        url: "/review",
        method: "GET",
      }),
      keepUnusedDataFor: 30,
    }),
  }),
});

export const { useCreateCommentMutation } = commentApi;
