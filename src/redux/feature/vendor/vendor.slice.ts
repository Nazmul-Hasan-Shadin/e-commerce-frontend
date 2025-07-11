import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

export type TCategoryFilter = {
  brandName: string[];
  categoryName: string;
};

const initialState: TCategoryFilter = {
  brandName: [],
  categoryName: "",
};

export const categoryFilterSlice = createSlice({
  name: "categoryFilter",

  initialState,
  reducers: {
    selectBrand: (state, action: PayloadAction<string[]>) => {
      state.brandName = action.payload;
    },
    selectCategory: (state, action) => {
      state.categoryName = action.payload;
    },
  },
});

export const { selectBrand, selectCategory } = categoryFilterSlice.actions;

export default categoryFilterSlice.reducer;
