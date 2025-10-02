import { baseApi } from "../../api/baseApi";

const sslPaymentInit = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initPaymentssl: builder.mutation({
      query: (orderId) => ({
        url: `/payment-gate/init-payment/${orderId}`,
        method: "POST",
        body: orderId,
      }),
      transformResponse: (response: { data:any }, meta, arg) => response.data,
    }),
  }),
});

export const { useInitPaymentsslMutation } = sslPaymentInit;
