import { setStorage } from '@/utils/storage'
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import layoutReducer from './slices/layoutSlice'
import tabsReducer from './slices/tabsSlice'
import uiReducer, { setPrimaryColor } from './slices/uiSlice'

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: setPrimaryColor,
  effect: async (action) => {
    setStorage('primaryColor', action.payload, 'local')
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
