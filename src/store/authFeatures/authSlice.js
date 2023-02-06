import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";

const initialState = {
  loading: false,
  authInfo: localStorage.getItem("authInfo")
    ? JSON.parse(localStorage.getItem("authInfo"))
    : null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("authInfo"); // deletes token from storage
      state.loading = false;
      state.userInfo = null;
      localStorage.clear();
    },
  },
  extraReducers: {
    // userLogin
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.success = true;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
// export actions

export const { logout } = authSlice.actions;
export default authSlice.reducer;
