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
  }),
});

export const { useFollowShopMutation } = shopApi;
