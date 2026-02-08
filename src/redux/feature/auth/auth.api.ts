import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => {
        console.log('login queyr',userInfo);
        
        return {
          url: "/auth/login",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    register: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/user/register",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/change-password",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (userInfo) => {
        return {
          url: `/auth/reset-password?token=${userInfo.token}`,
          method: "POST",
          body: userInfo,
        };
      },
    }),
    forgetPassword: builder.mutation({
      query: (userInfo) => {
        return {
          url: `/auth/forget-password`,
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
      providesTags: ["createShop"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useChangePasswordMutation,
  useResetPasswordMutation,
  useForgetPasswordMutation,
} = authApi;
