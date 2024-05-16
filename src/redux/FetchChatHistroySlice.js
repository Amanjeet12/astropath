// statusSlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import WebUrls from '../screens/api/WebUrls';
import {API} from '../constant/api';

const initialState = {
  isData: null,
  isloading: false,
  isSuccess: false,
  isError: false,
};

export const fetchChatHistrory = createAsyncThunk(
  'fetchChatHistrory',
  async (token, thunkApi) => {
    try {
      const response = await API.get(WebUrls.url.chat_history, {
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

const FetchChatHistroySlice = createSlice({
  name: 'chatHistory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchChatHistrory.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchChatHistrory.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.isSuccess = true;
      state.isData = action.payload;
    });
    builder.addCase(fetchChatHistrory.rejected, state => {
      state.isloading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default FetchChatHistroySlice.reducer;
