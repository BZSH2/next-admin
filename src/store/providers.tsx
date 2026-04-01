'use client';

import { Provider } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { makeStore } from './store';
import { getStorage } from '@/utils/storage';
import { setCollapsed, setTheme } from './slices/uiSlice';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const store = useMemo(() => makeStore(), []);

  useEffect(() => {
    const collapsed = getStorage('collapsed', 'local');
    const theme = getStorage('theme', 'local');
    if (collapsed !== null) {
      store.dispatch(setCollapsed(collapsed));
    }
    if (theme !== null) {
      store.dispatch(setTheme(theme));
    }
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
