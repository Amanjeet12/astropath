// cartSlice.js

import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = {
        ...action.payload,
      };

      const existingItemIndex = state.items.findIndex(
        item =>
          item.name === newItem.name &&
          item.value === newItem.value &&
          item.day === newItem.day &&
          item.month === newItem.month &&
          item.year === newItem.year &&
          item.hour === newItem.hour &&
          item.min === newItem.min &&
          item.lat === newItem.lat &&
          item.lon === newItem.lon,
      );

      if (existingItemIndex === -1) {
        state.items.push(newItem);
      } else {
        console.log('Item already exists in cart');
      }
    },

    resetCart: state => {
      state.items = [];
    },
  },
});

export const {addToCart, resetCart} = cartSlice.actions;

export const selectedCartItems = state => state.cart.items;

export default cartSlice.reducer;
