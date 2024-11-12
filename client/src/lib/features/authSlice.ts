import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAccessToken,
  getRole,
  setRole,
  setTokens,
} from "@/_utils/helpers/auth";
import {
  AuthState,
  LoginPayload,
  LoginResponse,
} from "@/_utils/types";

import apiClient from "@/_utils/helpers/apiClient";


export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await apiClient.post<LoginResponse>(
      "/users/login",
      credentials,
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.errors ||
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An error occurred while logging in",
    );
  }
});


// set access token and refresh token in store initially
const accessToken = getAccessToken();
const role = getRole();

const initialState: AuthState = {
  access_token: accessToken ? accessToken : "",
  role: role ? role : "",
  loading: false,
  error: null,
} satisfies AuthState as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.access_token = action.payload.data.token || "";
          setTokens(action.payload?.data.token || "");
          setRole(action.payload?.data.role || "");
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

   
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
