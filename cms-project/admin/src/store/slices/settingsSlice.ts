import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  siteName: string;
}

const initialState: SettingsState = {
  siteName: 'RenewCred CMS'
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSiteName: (state, action: PayloadAction<string>) => {
      state.siteName = action.payload;
    }
  }
});

export const { setSiteName } = settingsSlice.actions;
export default settingsSlice.reducer;
