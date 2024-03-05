import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  posts: [],
};
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: { 
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    toggleLike: (state, action) => {
      const { postId, isLiked } = action.payload;
      const post = state.posts.find(post => post._id === postId);
      if (post) {
        post.isLiked = isLiked;
        post.likesCount += isLiked ? 1 : -1; // Increment or decrement likes count
      }
    },
  },
});

export const { setPosts , toggleLike } = postSlice.actions; // action created and reducer fn
export default postSlice.reducer;   //reducer fn generated used to update the state of the posts slice in the Redux store.

