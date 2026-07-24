import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  admin: Record<string, unknown> | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  admin: null,
  token: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ admin: Record<string, unknown>; token: string }>) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.admin = null;
      state.token = null;
      state.isAuthenticated = false;
    }
  }
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
