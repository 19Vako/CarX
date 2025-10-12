import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserState from "../interfaсes/userInterface";

export const initialState: UserState = {
  name: "",
  email: "",
  password: "",
};

const UserSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    clearUser: (state) => {
      state.name = "";
      state.email = "";
      state.password = "";
    },
  },
});

export const { setUser, clearUser } = UserSlice.actions;
export default UserSlice.reducer;
