import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TorderItems = {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  images?: string;
  name?: string;
  categoryId: string;
  inventoryCount: number;
  discount: number;
  shopId: string;
};

export type TCart = {
  orderItems: TorderItems[];
};

const initialState: TCart = {
  orderItems: [],
};

export const cartSlice = createSlice({
  name: "cart",

  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      console.log(payload.productId, "iam payload");

      const isExistIncart = state.orderItems.find(
        (cart) => cart.id === payload.id
      );

      if (isExistIncart) {
        isExistIncart.quantity = isExistIncart?.quantity + 1;
      } else {
        state.orderItems.push({ ...payload, quantity: 1 });
      }
    },
    removeFromCart: (state, { payload }) => {
      const itemIndex = state.orderItems.findIndex(
        (item) => item.productId === payload.productId
      );
      if (itemIndex !== -1) {
        const item = state.orderItems[itemIndex];

        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.orderItems.splice(itemIndex, 1);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

export const useGetCurrentCart = (state: RootState) => state?.cart?.orderItems;