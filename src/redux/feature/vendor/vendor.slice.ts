import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { logOutFromServer } from "@/src/services/auth";
import { stat } from "fs";

export type TCategoryFilter = {
  categoryName: string[];
};

const initialState: TCategoryFilter = {
  categoryName: [],
};

export const categoryFilterSlice = createSlice({
  name: "categoryFilter",

  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<string[]>) => {
      state.categoryName = action.payload;
    },
  },
});

export const { selectCategory } = categoryFilterSlice.actions;

export default categoryFilterSlice.reducer;
