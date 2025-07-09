import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

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
