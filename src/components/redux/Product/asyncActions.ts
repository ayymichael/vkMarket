import { createAsyncThunk } from "@reduxjs/toolkit"
import { Product } from "./types"

export const fetchProducts = createAsyncThunk<Product[]>(
    'product/fetchProducts',
    async () => {
    const data = await fetch('https://dummyjson.com/carts/1')
      .then((res) => res.json())
      .then((data) => data.products)
    
    return data;
  }
)