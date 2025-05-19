import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    name: "",
    email: "",
    usertoken: "",
  },
};
export const UserSlice = createSlice({
  name: "UserSlice",

  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      // state.personalDetails = { ...state.personalDetails, ...action.payload };
      state = action.payload;
      console.log("added user data in redux", action.payload);
    },
  },
});

export const { setUserInfo } = UserSlice.actions;

export default UserSlice.reducer;
