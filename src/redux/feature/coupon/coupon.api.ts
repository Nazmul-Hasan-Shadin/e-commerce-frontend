import { baseApi } from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCoupon: builder.mutation({
      query: (couponData) => ({
        url: "/coupon/create-coupon",
        method: "POST",
        body: couponData,
      }),
    }),
  }),
});

export const { useCreateCouponMutation } = couponApi;
