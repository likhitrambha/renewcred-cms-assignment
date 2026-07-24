import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  mode: 'dark' | 'light';
}

const initialState: ThemeState = {
  mode: 'dark'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<'dark' | 'light'>) => {
      state.mode = action.payload;
    }
  }
});

export const { setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
