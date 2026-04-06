import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./userInterfase";

const UserSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logInUser(state, action: PayloadAction<typeof initialState>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.photoURL = action.payload.photoURL;
    },

    logOutUser() {
      return initialState;
    },
  },
});

export const { logInUser, logOutUser } = UserSlice.actions;
export default UserSlice.reducer;
