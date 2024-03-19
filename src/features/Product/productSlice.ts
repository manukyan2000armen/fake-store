import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../type";
import {
  getAllCategories,
  getAllProducts,
  getProductsByCategory,
  getSingleProduct,
  getSortedProducts,
  updateProduct,
} from "./productAPI";

export const initialState: {
  products: Product[];
  product: Product;
  categories: [];
} = {
  products: [],
  product: {} as Product,
  categories: [],
};

const productSlice = createSlice({
  name: "product slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getSortedProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        if (state.product.id === action.payload.id) {
          state.product = action.payload;
        }
      });
  },
});

export default productSlice.reducer;
