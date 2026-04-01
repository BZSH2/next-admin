import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { menuConfig } from '@/config/menu';

export interface TabItem {
  key: string;
  title: string;
  closable?: boolean;
}

interface TabsState {
  items: TabItem[];
  activeKey: string;
}

const HOME_TAB_KEY = '/dashboard';
const getMenuTitleByKey = (items: MenuItem[], key: string): string | null => {
  for (const item of items) {
    if (item.key === key) return item.title;
    if (item.children?.length) {
      const childTitle = getMenuTitleByKey(item.children, key);
      if (childTitle) return childTitle;
    }
  }
  return null;
};

const HOME_TAB: TabItem = {
  key: HOME_TAB_KEY,
  title: getMenuTitleByKey(menuConfig, HOME_TAB_KEY) ?? '首页',
  closable: false,
};

const initialState: TabsState = {
  items: [HOME_TAB],
  activeKey: HOME_TAB_KEY,
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    addOrActivate(state, action: PayloadAction<TabItem>) {
      if (state.items.length === 0 || state.items[0]?.key !== HOME_TAB_KEY) {
        state.items = [HOME_TAB, ...state.items.filter((t) => t.key !== HOME_TAB_KEY)];
      } else {
        state.items[0] = { ...state.items[0], closable: false };
      }

      const exists = state.items.find((t) => t.key === action.payload.key);
      if (!exists) {
        const nextTab = {
          ...action.payload,
          closable: action.payload.key === HOME_TAB_KEY ? false : (action.payload.closable ?? true),
        };
        if (action.payload.key === HOME_TAB_KEY) {
          state.items[0] = { ...HOME_TAB, title: action.payload.title || HOME_TAB.title };
        } else {
          state.items.push(nextTab);
        }
      } else if (action.payload.key === HOME_TAB_KEY) {
        state.items[0] = { ...HOME_TAB, title: action.payload.title || HOME_TAB.title };
      }
      state.activeKey = action.payload.key;
    },
    activate(state, action: PayloadAction<string>) {
      state.activeKey = action.payload;
    },
    remove(state, action: PayloadAction<string>) {
      if (action.payload === HOME_TAB_KEY) return;
      const idx = state.items.findIndex((t) => t.key === action.payload);
      if (idx === -1) return;
      const removed = state.items.splice(idx, 1)[0];
      if (state.activeKey === removed?.key) {
        const next = state.items[idx] ?? state.items[idx - 1];
        state.activeKey = next?.key ?? HOME_TAB_KEY;
      }
    },
    reset(state) {
      state.items = [HOME_TAB];
      state.activeKey = HOME_TAB_KEY;
    },
  },
});

export const { addOrActivate, activate, remove, reset } = tabsSlice.actions;
export default tabsSlice.reducer;
