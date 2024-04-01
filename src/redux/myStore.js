import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import WalletBalanceSlice from './WalletBalanceSlice';

export const myStore = configureStore({
  reducer: {
    cart: cartReducer,
    wallet: WalletBalanceSlice,
  },
});
