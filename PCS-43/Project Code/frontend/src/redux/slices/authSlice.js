import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  userInfo: Cookies.get('userInfo')?JSON.parse(Cookies.get('userInfo')): null,
  isAuthenticated: Cookies.get('authToken')?true:false,
  token: Cookies.get("authToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      state.token = null;

      Cookies.remove("authToken");
      Cookies.remove("userInfo");
    },
  },
});

export const { setCredentials, logout, setToken } = authSlice.actions;
export default authSlice.reducer;
