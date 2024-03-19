import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import axios from "axios";
import productSlice from "../features/Product/productSlice";
import cartSlice from "../features/CartF/cartSlice";
import userSlice from "../features/UserF/userSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    carts: cartSlice,
    users: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const myAxios = axios.create({
  baseURL: "https://fakestoreapi.com",
});
