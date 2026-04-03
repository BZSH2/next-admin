import { settingConfig } from '@/config/setting.config'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface UIState {
  primaryColor: Storage.Value<'primaryColor'>
  collapsed: boolean
}

const initialState: UIState = {
  primaryColor: settingConfig.primaryColor,
  collapsed: settingConfig.collapsed,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setPrimaryColor(state, action: PayloadAction<Storage.Value<'primaryColor'>>) {
      state.primaryColor = action.payload
    },
    setCollapsed(state, action: PayloadAction<boolean>) {
      state.collapsed = action.payload
    },
    toggleCollapsed(state) {
      state.collapsed = !state.collapsed
    },
  },
})

export const { setPrimaryColor, setCollapsed, toggleCollapsed } = uiSlice.actions
export default uiSlice.reducer
