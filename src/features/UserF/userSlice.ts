import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../type";
import {
  getAllUsers,
  getSingleUser,
  sortUsers,
  updateUserData,
} from "./userAPI";

export const initialState: { users: User[]; user: User } = {
  users: [],
  user: {} as User,
};

const userSlice = createSlice({
  name: "user slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(sortUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        if (state.user.id === action.payload.id) {
          state.user = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
