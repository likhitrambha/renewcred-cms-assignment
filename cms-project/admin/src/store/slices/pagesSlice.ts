import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PageRecord } from '../../lib/types';

interface PagesState {
  items: PageRecord[];
  loading: boolean;
}

const initialState: PagesState = {
  items: [],
  loading: false
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setPages: (state, action: PayloadAction<PageRecord[]>) => {
      state.items = action.payload;
      state.loading = false;
    },
    appendPage: (state, action: PayloadAction<PageRecord>) => {
      state.items = [action.payload, ...state.items];
    }
  }
});

export const { setPages, appendPage } = pagesSlice.actions;
export default pagesSlice.reducer;
