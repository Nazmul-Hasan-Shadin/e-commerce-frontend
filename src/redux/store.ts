import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feature/auth/auth.slice";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
