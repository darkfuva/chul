import { getAllProducts } from '@/dummyData/Company'
import { createSlice } from '@reduxjs/toolkit'

const Products = getAllProducts()

// Define the initial state using that type
const initialState = {
  products: Products,
}

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      console.log(state.products)
      state.products = []
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state) => state.counter.value
export const getProducts = (state) => {
  
 return state.products.products};

export const productsReducer = counterSlice.reducer 