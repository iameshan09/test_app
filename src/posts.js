import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ASYNC GET ALL Posts FUNCTION
export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  const { data } = await axios.get(
    `https://test-app-backend09.herokuapp.com/app/main/`
  );
  console.log('getPosts');
  return data;
});

export const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
  },
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    addComment: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: {
    [getPosts.fulfilled]: (state, { payload }) => {
      state.posts = payload;
    },
  },
});

export const { addPost, addComment } = postSlice.actions;

export default postSlice.reducer;
