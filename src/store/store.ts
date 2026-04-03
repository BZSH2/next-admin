import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import uiReducer, { setTheme } from './slices/uiSlice'
import tabsReducer from './slices/tabsSlice'
import layoutReducer from './slices/layoutSlice'
import { setStorage } from '@/utils/storage'

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: setTheme,
  effect: async (action) => {
    setStorage('theme', action.payload, 'local')
  },
})

export const makeStore = () => {
  return configureStore({
    reducer: {
      ui: uiReducer,
      tabs: tabsReducer,
      layout: layoutReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }).prepend(listenerMiddleware.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>
export type AppDispatch = ReturnType<typeof makeStore>['dispatch']
