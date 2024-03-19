import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "../../app/store";
import { Product } from "../../type";

export const getAllProducts = createAsyncThunk("get all products", async () => {
  const { data } = await myAxios.get("/products");
  return data;
});

export const getSingleProduct = createAsyncThunk(
  "get a single product",
  async (id: number) => {
    const { data } = await myAxios.get(`/products/${id}`);
    return data;
  }
);

export const getAllCategories = createAsyncThunk(
  "get all categories",
  async () => {
    const { data } = await myAxios.get("/products/categories");
    return data;
  }
);

export const getProductsByCategory = createAsyncThunk(
  "get products by category",
  async (category: string) => {
    const { data } = await myAxios.get(`/products/category/${category}`);
    return data;
  }
);

export const getSortedProducts = createAsyncThunk(
  "get sorted products",
  async (sort: string) => {
    const { data } = await myAxios.get(`/products?sort=${sort}`);
    return data;
  }
);

export const addNewProduct = createAsyncThunk(
  "add new product",
  async (newProduct: Product) => {
    const { data } = await myAxios.post("/products", newProduct);
    return data;
  }
);

export const updateProduct = createAsyncThunk(
  "update product",
  async ({ id, value }: { id: number; value: Product }) => {
    const { data } = await myAxios.patch(`/products/${id}`, value);
    return data;
  }
);

export const deleteProductById = createAsyncThunk(
  "delete product",
  async (id: number) => {
    const { data } = await myAxios.delete(`/products/${id}`);
    return data;
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId: number) => {
    const { data } = await myAxios.get(`/products/${productId}`);
    return data;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId: number) => {
    await myAxios.delete(`/carts/${productId}`);
    return productId;
  }
);
