import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authSlice from "./feature/auth/auth.slice";
import { baseApi } from "./api/baseApi";
import { cartSlice } from "./feature/cart/cartSlice";
import { categoryFilterSlice } from "./feature/vendor/vendor.slice";
import { compareSlice } from "./feature/compare/compare.slice";

const persistConfig = {
  key: "auth",
  storage,
};

const cartPersistConfig = {
  key: "cart",
  storage,
};
const comparePersistConfig = {
  key: "compareItems",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice);

const persistedCartReducer = persistReducer(
  cartPersistConfig,
  cartSlice.reducer,
);
const comparePersistedReducer = persistReducer(
  comparePersistConfig,
  compareSlice.reducer,
);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    cart: persistedCartReducer,
    category: categoryFilterSlice.reducer,
    compareItem: comparePersistedReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
