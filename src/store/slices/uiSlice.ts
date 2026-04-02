import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { defaultLocale, type LocaleCode } from '@/config/locale.config'
import { settingConfig } from '@/config/setting.config'

export type Theme = 'light' | 'dark' | 'system'
export type LocaleType = LocaleCode

interface UIState {
  theme: Theme
  locale: LocaleType
  collapsed: boolean
}

const initialState: UIState = {
  theme: 'light',
  locale: defaultLocale,
  collapsed: settingConfig.collapsed,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload
    },
    setLocale(state, action: PayloadAction<LocaleType>) {
      state.locale = action.payload
    },
    setCollapsed(state, action: PayloadAction<boolean>) {
      state.collapsed = action.payload
    },
    toggleCollapsed(state) {
      state.collapsed = !state.collapsed
    },
  },
})

export const { setTheme, setLocale, setCollapsed, toggleCollapsed } = uiSlice.actions
export default uiSlice.reducer
