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

export const fetchAllBlogs = createAsyncThunk(
  'fetchAllBlogs',
  async (token, thunkApi) => {
    try {
      const response = await API.get(WebUrls.url.fetch_All_blogs, {
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

const BlogData = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAllBlogs.pending, state => {
      state.isloading = true;
    });
    builder.addCase(fetchAllBlogs.fulfilled, (state, action) => {
      state.isloading = false;
      state.isError = false;
      state.isSuccess = true;
      state.isData = action.payload;
    });
    builder.addCase(fetchAllBlogs.rejected, state => {
      state.isloading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default BlogData.reducer;
