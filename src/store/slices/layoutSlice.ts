import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface LayoutState {
  isMobile: boolean
  mobileSidebarOpen: boolean
}

const initialState: LayoutState = {
  isMobile: false,
  mobileSidebarOpen: false,
}

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setIsMobile(state, action: PayloadAction<boolean>) {
      state.isMobile = action.payload
    },
    setMobileSidebarOpen(state, action: PayloadAction<boolean>) {
      state.mobileSidebarOpen = action.payload
    },
    openMobileSidebar(state) {
      state.mobileSidebarOpen = true
    },
    closeMobileSidebar(state) {
      state.mobileSidebarOpen = false
    },
  },
})

export const { setIsMobile, setMobileSidebarOpen, openMobileSidebar, closeMobileSidebar } =
  layoutSlice.actions
export default layoutSlice.reducer
