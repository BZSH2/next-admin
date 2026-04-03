import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { menuConfig } from '@/config/menu'

export interface TabItem {
  key: string
  title: string
  closable?: boolean
}

interface TabsState {
  items: TabItem[]
  activeKey: string
}

const HOME_TAB_KEY = '/dashboard'
const getMenuTitleByKey = (items: MenuItem[], key: string): string | null => {
  for (const item of items) {
    if (item.key === key) return item.title
    if (item.children?.length) {
      const childTitle = getMenuTitleByKey(item.children, key)
      if (childTitle) return childTitle
    }
  }
  return null
}

const HOME_TAB: TabItem = {
  key: HOME_TAB_KEY,
  title: getMenuTitleByKey(menuConfig, HOME_TAB_KEY) ?? '首页',
  closable: false,
}

const createHomeTab = (title?: string): TabItem => ({
  ...HOME_TAB,
  title: title || HOME_TAB.title,
  closable: false,
})

const normalizeTab = (tab: TabItem): TabItem => {
  if (tab.key === HOME_TAB_KEY) {
    return createHomeTab(tab.title)
  }
  return {
    ...tab,
    closable: tab.closable ?? true,
  }
}

const ensureHomeTab = (state: TabsState, title?: string) => {
  const currentHome = state.items.find((tab) => tab.key === HOME_TAB_KEY)
  const nextHomeTitle = title || currentHome?.title || HOME_TAB.title
  const others = state.items.filter((tab) => tab.key !== HOME_TAB_KEY).map(normalizeTab)
  state.items = [createHomeTab(nextHomeTitle), ...others]
}

const initialState: TabsState = {
  items: [HOME_TAB],
  activeKey: HOME_TAB_KEY,
}

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    syncTitles(state, action: PayloadAction<Record<string, string>>) {
      const titleMap = action.payload
      ensureHomeTab(state, titleMap[HOME_TAB_KEY])
      state.items = state.items.map((tab) => {
        const nextTitle = titleMap[tab.key]
        return normalizeTab(nextTitle ? { ...tab, title: nextTitle } : tab)
      })
    },
    addOrActivate(state, action: PayloadAction<TabItem>) {
      ensureHomeTab(state)
      const payload = normalizeTab(action.payload)
      if (payload.key === HOME_TAB_KEY) {
        state.items[0] = createHomeTab(payload.title)
        state.activeKey = payload.key
        return
      }

      const exists = state.items.find((tab) => tab.key === payload.key)
      if (!exists) {
        state.items.push(payload)
      }
      state.activeKey = payload.key
    },
    activate(state, action: PayloadAction<string>) {
      state.activeKey = action.payload
    },
    remove(state, action: PayloadAction<string>) {
      if (action.payload === HOME_TAB_KEY) return
      const idx = state.items.findIndex((t) => t.key === action.payload)
      if (idx === -1) return
      const removed = state.items.splice(idx, 1)[0]
      if (state.activeKey === removed?.key) {
        const next = state.items[idx] ?? state.items[idx - 1]
        state.activeKey = next?.key ?? HOME_TAB_KEY
      }
    },
    reset(state) {
      state.items = [createHomeTab()]
      state.activeKey = HOME_TAB_KEY
    },
  },
})

export const { syncTitles, addOrActivate, activate, remove, reset } = tabsSlice.actions
export default tabsSlice.reducer
