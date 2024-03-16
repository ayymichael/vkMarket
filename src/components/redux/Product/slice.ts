import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Product, ProductSliceState, Status } from './types'
import { fetchProducts } from './asyncActions'

const initialState: ProductSliceState = {
  items: [],
  status: Status.LOADING,
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Product[]>) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.items = []
      state.status = Status.LOADING
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchProducts.rejected, (state) => {
      state.items = []
      state.status = Status.ERROR
    })
  },
})

export const { setItems } = productSlice.actions

export default productSlice.reducer