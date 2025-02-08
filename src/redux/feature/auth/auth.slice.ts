import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { logOutFromServer } from "@/src/services/auth";

export type TUser = {
  email: string;
  role: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const clearCookie = (refreshToken: string) => {
  document.cookie = `${(refreshToken = "")}`;
};

export const authSlice = createSlice({
  name: "auth",

  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      (state.user = user), (state.token = token);
    },

    logOut: (state) => {
      state.user = null;
      state.token = null;
      logOutFromServer();
      // clearCookie('refreshToken')
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
