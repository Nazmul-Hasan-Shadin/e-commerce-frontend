import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => {
        console.log(userInfo, "iam useerInfo");

        return {
          url: "/user/login",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    register: builder.mutation({
      query: (userInfo) => {
        console.log(userInfo, "iam useerInfo");

        return {
          url: "/user/register",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    getCurrentUser: builder.query({
      query: () => {
        return {
          url: "/user",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetCurrentUserQuery } =
  authApi;
