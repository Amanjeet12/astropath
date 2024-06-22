// statusSlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import WebUrls from '../screens/api/WebUrls';
import {API} from '../constant/api';

const initialState = {
  liveData: null,
  isloading: false,
  isSuccess: false,
  isError: false,
};

export const fetchLiveAstrolger = createAsyncThunk(
  'fetchLiveAstrolger',
  async (token, thunkApi) => {
    console.log('token', token);
    try {
      const response = await API.get(WebUrls.url.live, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('response===>', response.data);
      return response.data;
    } catch (error) {
      console.log('error===>', error);
      return thunkApi.rejectWithValue(error);
    }
  },
);

const LiveAstrologerSlice = createSlice({
  name: 'LiveAstroger',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchLiveAstrolger.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchLiveAstrolger.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.isSuccess = true;
      state.liveData = action.payload;
    });
    builder.addCase(fetchLiveAstrolger.rejected, state => {
      state.isloading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default LiveAstrologerSlice.reducer;
