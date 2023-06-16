import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts, createPost as createPostAPI, deletePost as deletePostAPI, updatePost as updatePostAPI } from '../services/postApi'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await getPosts();
  return response;
});

export const createPost = createAsyncThunk('posts/createPost', async (post) => {
  const response = await createPostAPI(post);
  return response;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  const response = await deletePostAPI(id);
  return response;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, post }) => {
  const response = await updatePostAPI(id, post);
  return response;
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      // Update state with credentials data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.posts.splice(index, 1);
        }
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      });
  },
});

export const { setCredentials } = postSlice.actions; 

export const selectPosts = (state) => state.posts.posts;

export default postSlice.reducer;
