import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Cart, Product } from "../../type";
import { getAllCarts } from "./cartAPI";
import { addToCart } from "../Product/productAPI";

const initialState: { carts: Cart[]; cart: Cart; cartItems: Product[] } = {
  carts: [],
  cart: {} as Cart,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart slice",
  initialState,
  reducers: {
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCarts.fulfilled, (state, action) => {
        state.carts = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems.push(action.payload);
      });
  },
});
export const { removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
