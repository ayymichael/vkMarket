export type CartItem = {
  id: number
  title: string
  price: number
  thumbnail?: string
  count: number
}

export interface CartSliceState {
  totalPrice: number
  items: CartItem[]
}
