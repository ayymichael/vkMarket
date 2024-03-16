import { combineReducers, configureStore } from '@reduxjs/toolkit'
import product from './Product/slice'
import cart from './Cart/slice'
import { useDispatch } from 'react-redux'

const rootReducer = combineReducers({
  product,
  cart,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch