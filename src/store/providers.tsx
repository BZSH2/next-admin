'use client'

import { getStorage } from '@/utils/storage'
import { ConfigProvider, theme as antdTheme } from 'antd'
import { useEffect, useMemo } from 'react'
import { Provider } from 'react-redux'
import { useAppSelector } from './hooks'
import { setPrimaryColor } from './slices/uiSlice'
import { makeStore } from './store'

function AntdThemeProvider({ children }: { children: React.ReactNode }) {
  const primaryColor = useAppSelector((state) => state.ui.primaryColor)

  useEffect(() => {
    document.documentElement.classList.remove('dark')
    document.documentElement.dataset['theme'] = 'light'
    document.documentElement.style.colorScheme = 'light'
    document.documentElement.style.setProperty('--primary', primaryColor)
  }, [primaryColor])

  return (
    <ConfigProvider
      theme={{
        algorithm: antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: primaryColor,
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const store = useMemo(() => makeStore(), [])

  useEffect(() => {
    const primaryColor = getStorage('primaryColor', 'local')
    if (primaryColor !== null) {
      store.dispatch(setPrimaryColor(primaryColor))
    }
  }, [store])

  return (
    <Provider store={store}>
      <AntdThemeProvider>{children}</AntdThemeProvider>
    </Provider>
  )
}
