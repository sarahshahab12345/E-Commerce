import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: true,
  isLaoding: false,
  user: null,
};

//------------    RegisterUser    --------------
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const responce = await axios.post(
      "http://localhost:5001/auth/register",
      formData,
      {
        withCredentials: true,
      }
    );

    return responce.data;
  }
);

//------------    LoginUser    --------------
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const responce = await axios.post(
    "http://localhost:5001/auth/login",
    formData,
    {
      withCredentials: true,
    }
  );

  return responce.data;
});

//------------    CheackAuthUser    --------------
export const checkAuthUser = createAsyncThunk(
  "http://localhost:5173/auth/check-auth",
  async () => {
    const responce = await axios.get("http://localhost:5001/auth/check-auth", {
      withCredentials: true,
      headers: {
        "Cache-Control": "no-cache, must-revalidate, proxy-revalidate",
      },
    });
    return responce.data;
  }
);

const authSlicer = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLaoding = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLaoding = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLaoding = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLaoding = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLaoding = false;
        state.isAuthenticated = action.payload.success ? true : false;
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLaoding = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(checkAuthUser.pending, (state) => {
        state.isLaoding = true;
      })
      .addCase(checkAuthUser.fulfilled, (state, action) => {
        state.isLaoding = false;
        state.isAuthenticated = action.payload.success ? true : false;
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(checkAuthUser.rejected, (state, action) => {
        state.isLaoding = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export default authSlicer.reducer;
