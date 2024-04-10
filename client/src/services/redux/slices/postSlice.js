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
    addPost:(state, action) =>{
      state.posts.push(action.payload);
    },

    addComment: (state, action) => {
      const { postId, userId, comment } = action.payload;
      const post = state.posts.find(post => post._id === postId);
      if (post) {
        post.comments.push({ userId, comment });
      }
    },
    toggleLike: (state, action) => {
      const { postId, userId } = action.payload;
      const post = state.posts.find(post => post._id === postId);
      if (post) {
        if (post.likes.some(like => like.user === userId)) {
          // User has already liked the post, so unlike it
          post.likes = post.likes.filter(like => like.user !== userId);
        } else {
          // User hasn't liked the post, so like it
          post.likes.push({ user: userId });
        }
      }
    },
   
    
  },
});

export const { setPosts , addPost ,addComment , toggleLike} = postSlice.actions; // action created and reducer fn
export default postSlice.reducer;   //reducer fn generated used to update the state of the posts slice in the Redux store.

