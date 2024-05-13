import { configureStore } from '@reduxjs/toolkit'
import currentPageSlice from './features/currentPage/currentPageSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      currentPage: currentPageSlice,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
