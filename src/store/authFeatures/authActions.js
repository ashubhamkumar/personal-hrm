import { createAsyncThunk } from "@reduxjs/toolkit";
import hrmApi from "../../apis/hrmApi";

export const userLogin = createAsyncThunk(
  "userLogin",
  async ({ userId, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // make request to backend
      const { data } = await hrmApi.post(
        "/auth/signin",
        { userId, password },
        config
      );
      // store user's token in local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
