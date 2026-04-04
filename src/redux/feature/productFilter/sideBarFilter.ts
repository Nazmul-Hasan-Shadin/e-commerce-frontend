import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  isFilterOpen: boolean;
}

const initialState: IInitialState = {
  isFilterOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggoleFilter: (state) => {
      state.isFilterOpen = !state.isFilterOpen;
    },
  },
});

export const { toggoleFilter } = uiSlice.actions;
export default uiSlice.reducer;
