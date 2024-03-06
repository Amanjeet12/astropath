import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const myStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
