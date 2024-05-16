import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import WalletBalanceSlice from './WalletBalanceSlice';
import blogSlice from './blogSlice';
import AstrologerSlice from './AstrologerSlice';
import FetchChatHistroySlice from './FetchChatHistroySlice';
import BannerSlice from './BannerSlice';

export const myStore = configureStore({
  reducer: {
    cart: cartReducer,
    wallet: WalletBalanceSlice,
    blog: blogSlice,
    astrologer: AstrologerSlice,
    chat: FetchChatHistroySlice,
    banner: BannerSlice,
  },
});
