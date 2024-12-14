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

    checkValidityOfFollow: builder.mutation({
      query: (shopFollowInfo) => {
        console.log(shopFollowInfo);

        return {
          url: `/shop/check-validity-follow`,
          method: "post",
          body: shopFollowInfo,
        };
      },
    }),

    unfollowShop: builder.mutation({
      query: (shopFollowInfo) => {
        console.log(shopFollowInfo);

        return {
          url: `/shop/unfollow`,
          method: "post",
          body: shopFollowInfo,
        };
      },
      invalidatesTags: ["follow"],
    }),
  }),
});

export const {
  useFollowShopMutation,
  useGetShopInfoQuery,
  useCheckValidityOfFollowMutation,
  useUnfollowShopMutation,
} = shopApi;
