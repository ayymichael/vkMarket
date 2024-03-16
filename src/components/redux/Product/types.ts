export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
  }
  
  export type Product = {
    id: number
    title: string
    price: number
    quantity: number
    total: number
    discountPercentage: number
    discountedPrice: number
    thumbnail: string
  }
  
  export interface ProductSliceState {
    items: Product[]
    status: Status
  }