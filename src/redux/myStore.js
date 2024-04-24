import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import WalletBalanceSlice from './WalletBalanceSlice';
import blogSlice from './blogSlice';
import AstrologerSlice from './AstrologerSlice';

export const myStore = configureStore({
  reducer: {
    cart: cartReducer,
    wallet: WalletBalanceSlice,
    blog: blogSlice,
    astrologer: AstrologerSlice,
  },
});
