import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { settingConfig } from '@/config/setting.config';

type Theme = 'light' | 'dark' | 'system';

interface UIState {
  theme: Theme;
  collapsed: boolean;
}

const initialState: UIState = {
  theme: 'light',
  collapsed: settingConfig.collapsed,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    setCollapsed(state, action: PayloadAction<boolean>) {
      state.collapsed = action.payload;
    },
    toggleCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
  },
});

export const { setTheme, setCollapsed, toggleCollapsed } = uiSlice.actions;
export default uiSlice.reducer;
