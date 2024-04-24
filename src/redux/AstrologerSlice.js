// statusSlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import WebUrls from '../screens/api/WebUrls';
import {API} from '../constant/api';

const initialState = {
  topAstrologer: null,
  isloading: false,
  isSuccess: false,
  isError: false,
};

export const fetchTopAstrologer = createAsyncThunk(
  'fetchTopAstrologer',
  async (token, thunkApi) => {
    try {
      const response = await API.get(WebUrls.url.fetch_Top_All_Astrologer, {
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

const AstrologerSlice = createSlice({
  name: 'topAstrologer',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTopAstrologer.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchTopAstrologer.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.isSuccess = true;
      state.isData = action.payload;
    });
    builder.addCase(fetchTopAstrologer.rejected, state => {
      state.isloading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default AstrologerSlice.reducer;
