'use client';

import { Provider } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { makeStore } from './store';
import { getStorage } from '@/utils/storage';
import { setLocale, setTheme } from './slices/uiSlice';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const store = useMemo(() => makeStore(), []);

  useEffect(() => {
    const theme = getStorage('theme', 'local');
    const locale = getStorage('locale', 'local');
    if (theme !== null) {
      store.dispatch(setTheme(theme));
    }
    if (locale !== null) {
      store.dispatch(setLocale(locale));
    }
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
