import { baseApi } from "../../api/baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    followShop: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/shop/follow",
          method: "POST",
          body: userInfo,
        };
      },
      invalidatesTags: ["getShopInfoById"],
    }),

    getShopInfo: builder.query({
      query: (shopId: string) => {
        return {
          url: `/shop/${shopId}`,
          method: "GET",
        };
      },
      providesTags: ["getShopInfoById"],
    }),

    getAllShopTopTen: builder.query({
      query: () => {
        return {
          url: `/shop`,
          method: "GET",
        };
      },
    }),
    checkValidityOfFollow: builder.mutation({
      query: (shopFollowInfo) => {
        return {
          url: `/shop/check-validity-follow`,
          method: "post",
          body: shopFollowInfo,
        };
      },
    }),

    unfollowShop: builder.mutation({
      query: (shopFollowInfo) => {
        return {
          url: `/shop/unfollow`,
          method: "post",
          body: shopFollowInfo,
        };
      },
      invalidatesTags: ["follow", "getShopInfoById"],
    }),
  }),
});

export const {
  useFollowShopMutation,
  useGetShopInfoQuery,
  useCheckValidityOfFollowMutation,
  useUnfollowShopMutation,
  useGetAllShopTopTenQuery,
} = shopApi;
