import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: { _id: string; name: string; email: string; token: string } | null;
  token: string | null;
  loading: boolean;
  is_verfiyed: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  is_verfiyed: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    tokenVerfiying(state,action){
      state.is_verfiyed = action.payload
    },
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(
      state,
      action: PayloadAction<{ user: { _id: string; name: string; email: string; token: string }; token: string }>
    ) {
      state.loading = false;
      state.user = action.payload.user;
      state.is_verfiyed = true;
      localStorage.setItem("token", action.payload.token)
      state.token = action.payload.token;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.is_verfiyed = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.is_verfiyed = false;
      state.token = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout,tokenVerfiying} = authSlice.actions;
export default authSlice.reducer;
