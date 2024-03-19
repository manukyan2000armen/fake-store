import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "../../app/store";
import { User } from "../../type";

export const getAllUsers = createAsyncThunk("get all users", async () => {
  const { data } = await myAxios.get("/users");
  return data;
});

export const sortUsers = createAsyncThunk("sort user", async (sort: string) => {
  const { data } = await myAxios.get(`/users?sort=${sort}`);
  return data;
});

export const addNewUser = createAsyncThunk(
  "add new user",
  async (newUser: User) => {
    const { data } = await myAxios.post("/users", newUser);
    return data;
  }
);

export const getSingleUser = createAsyncThunk(
  "get single user",
  async (id: number) => {
    const { data } = await myAxios.get(`/users/${id}`);
    return data;
  }
);

export const updateUserData = createAsyncThunk(
  "update user data",
  async ({ id, value }: { id: number; value: User }) => {
    const { data } = await myAxios.patch(`/users/${id}`, value);
    return data;
  }
);

export const deleteUser = createAsyncThunk(
  "delete user",
  async (id: number) => {
    const { data } = await myAxios.delete(`/users/${id}`);
    return data;
  }
);
