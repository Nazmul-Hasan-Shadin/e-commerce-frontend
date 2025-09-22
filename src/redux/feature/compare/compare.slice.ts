import { createSlice } from "@reduxjs/toolkit";


interface IState {
  product: {
    id: string;
    name: string;
  }[];
  maxItem: number;
}
const initialState: IState = {
  product: [],
  maxItem: 3,
};

export const compareSlice = createSlice({
  name: "compare state",
  initialState,
  reducers: {
    addToCompare: (state, { payload }) => {
      if (state.product.find((product) => product.id === payload.id)) return;
      if (state.product.length < 3) {
        state.product.push(payload);
      }
    },
    removeCompare: (state, { payload }) => {
      const isProductExist = state.product.find((p) => p.id === payload.id);

      if (isProductExist) {
        state.product = state.product.filter(
          (product) => product.id !== isProductExist.id
        );
      }
    },
  },
});

export const { addToCompare, removeCompare } = compareSlice.actions;
export default compareSlice.reducer;
