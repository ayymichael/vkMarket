import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { calcTotalPrice } from '../../../utils/calcTotalPrice'
import { getItemFromLS } from '../../../utils/getItemFromLS'
import { CartItem, CartSliceState } from './types'

const cartData = getItemFromLS()

const initialState: CartSliceState = {
  totalPrice: cartData.totalPrice,
  items: cartData.items,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)

      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }

      state.totalPrice = calcTotalPrice(state.items)
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find(
        (obj) => obj.id === Number(action.payload)
      )
      if (findItem) {
        findItem.count--
        state.totalPrice -= findItem.price
      }
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (obj) => obj.id !== Number(action.payload)
      )
      state.totalPrice = calcTotalPrice(state.items)
    },

    cartClear(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export default cartSlice.reducer

export const { addItem, minusItem, removeItem, cartClear } = cartSlice.actions
