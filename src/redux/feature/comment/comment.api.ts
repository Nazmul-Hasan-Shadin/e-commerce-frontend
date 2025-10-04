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

    getMyReview: builder.infiniteQuery({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPage, lastPageParam) =>
          lastPageParam + 1,
      },
      query: ({ pageParam }) => ({
        url: `/review/my-review?page=${pageParam}`,
        method: "GET",
      }),
      keepUnusedDataFor: 30,
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useCreateCommentMutation, useGetMyReviewInfiniteQuery } =
  commentApi;
