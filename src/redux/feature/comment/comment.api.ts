import { baseApi } from "../../api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (commentData) => ({
        url: "/review",
        method: "POST",
        body: commentData,
      }),
    }),
  }),
});
export const { useCreateCommentMutation } = commentApi;
