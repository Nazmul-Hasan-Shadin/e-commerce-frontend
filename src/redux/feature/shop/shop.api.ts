import { baseApi } from "../../api/baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    followShop: builder.mutation({
      query: (userInfo) => {
        console.log(userInfo, "iam useerInfo");

        return {
          url: "/shop/follow",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    getShopInfo: builder.query({
      query: (shopId: string) => {
        console.log(shopId);

        return {
          url: `/shop/${shopId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useFollowShopMutation, useGetShopInfoQuery } = shopApi;
