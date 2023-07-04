import { createSlice } from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: 'orders',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addOrder: (state, action) => {
      console.log(state);
      state.orders = [...state.orders, action.payload.valueState];
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { addOrder, decrement, incrementByAmount } = orderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getOrders = (state) => {
  return state.orders.orders;
};

export const orderReducer = orderSlice.reducer;
