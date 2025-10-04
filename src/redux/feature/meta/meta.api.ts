import { baseApi } from "../../api/baseApi";

const metaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMeta: builder.query({
      query: () => {
        return {
          url: "/meta",
          method: "GET",
        };
      },
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetMetaQuery } = metaApi;
