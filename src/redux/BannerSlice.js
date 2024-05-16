// statusSlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import WebUrls from '../screens/api/WebUrls';
import {API} from '../constant/api';

const initialState = {
  data: null,
  isloading: false,
  isSuccess: false,
  isError: false,
};

export const fetchBanner = createAsyncThunk(
  'fetchBanner',
  async (token, thunkApi) => {
    try {
      const response = await API.get(WebUrls.url.banner, {
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

const BannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchBanner.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchBanner.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(fetchBanner.rejected, state => {
      state.isloading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default BannerSlice.reducer;
