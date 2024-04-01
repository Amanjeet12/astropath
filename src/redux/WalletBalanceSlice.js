// statusSlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import WebUrls from '../screens/api/WebUrls';
import {API} from '../constant/api';

const initialState = {
  isData: null,
  walletBalance: 0,
  isloading: false,
  isSuccess: false,
  isError: false,
};

export const fetchWalletbalance = createAsyncThunk(
  'fetchWalletbalance',
  async (token, thunkApi) => {
    try {
      const response = await API.get(WebUrls.url.user_detail, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('response===>', response.data);
      return response.data;
    } catch (error) {
      console.log('error===>', error);
      thunkApi.rejectWithValue(error);
    }
  },
);

const WalletBalance = createSlice({
  name: 'walletbalance',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchWalletbalance.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchWalletbalance.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.isSuccess = true;
      state.isData = action.payload;
      if (state.isData) {
        state.walletBalance = state.isData.balance;
      }
    });
    builder.addCase(fetchWalletbalance.rejected, state => {
      state.isloading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export const {setCallEnabled, setChatEnabled, setVcEnabled} =
  WalletBalance.actions;
export default WalletBalance.reducer;
