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

    getAllShops: builder.query({
      query: (queryObj) => {
        const params = new URLSearchParams();

        console.log(queryObj, "quryobj");

        if (queryObj) {
          for (const key in queryObj) {
            params.append(key, queryObj[key]);
          }
        }

        return {
          url: `/shop/all-shops`,
          method: "get",
          params: params,
        };
      },
    }),

    checkValidityOfFollow: builder.mutation({
      query: (shopFollowInfo) => {
        return {
          url: `/shop/check-validity-follow`,
          method: "POST",
          body: shopFollowInfo,
        };
      },
    }),

    unfollowShop: builder.mutation({
      query: (shopFollowInfo) => {
        return {
          url: `/shop/unfollow`,
          method: "POST",
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
  useGetAllShopsQuery,
  useGetAllShopTopTenQuery,
} = shopApi;
