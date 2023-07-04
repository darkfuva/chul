import { createSlice } from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState = {
  isOpen: false,
};

export const leftNavbarSlice = createSlice({
  name: 'leftNavbar',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showNavbar: (state, action) => {
      console.log(state);
      state.isOpen = action.payload.isOpen
    },
  },
});

export const { showNavbar } = leftNavbarSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getNavbarState = (state) => {
  return state.leftNavbar.isOpen;
};

export const leftNavbarReducer = leftNavbarSlice.reducer;
