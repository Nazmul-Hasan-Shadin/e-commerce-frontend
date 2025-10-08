import { baseApi } from "../../api/baseApi";

const sslPaymentInit = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initPaymentssl: builder.mutation({
      query: (paymentInfo) => ({
        url: `/payment-gate/init-payment`,
        method: "POST",
        body: paymentInfo,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
  }),
});

export const { useInitPaymentsslMutation } = sslPaymentInit;
