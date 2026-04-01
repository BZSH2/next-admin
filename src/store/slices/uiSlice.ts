import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { settingConfig } from '@/config/setting.config';

export type Theme = 'light' | 'dark' | 'system';
export type LocaleType = 'zh-CN' | 'en-US';

interface UIState {
  theme: Theme;
  locale: LocaleType;
  collapsed: boolean;
}

const initialState: UIState = {
  theme: 'light',
  locale: 'zh-CN',
  collapsed: settingConfig.collapsed,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    setLocale(state, action: PayloadAction<LocaleType>) {
      state.locale = action.payload;
    },
    setCollapsed(state, action: PayloadAction<boolean>) {
      state.collapsed = action.payload;
    },
    toggleCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
  },
});

export const { setTheme, setLocale, setCollapsed, toggleCollapsed } = uiSlice.actions;
export default uiSlice.reducer;
