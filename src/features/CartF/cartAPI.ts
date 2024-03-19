import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "../../app/store";

export const getAllCarts = createAsyncThunk("get all carts", async () => {
  const { data } = await myAxios.get("/carts");
  return data;
});
