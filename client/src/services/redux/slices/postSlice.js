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
    toggleLike: (state, action) => {
      const { postId, userId, comment } = action.payload;
      const postIndex = state.posts.findIndex(post => post._id === postId);
      if (postIndex !== -1) {
        state.posts[postIndex].comments.push({ user: userId, text: comment });
      }
    },

    addComment: (state, action) => {
      const { postId, userId, comment } = action.payload;
      const post = state.posts.find(post => post._id === postId);
      if (post) {
        post.comments.push({ userId, comment });
      }
    },
   
    
  },
});

export const { setPosts , addPost ,toggleLike, addComment} = postSlice.actions; // action created and reducer fn
export default postSlice.reducer;   //reducer fn generated used to update the state of the posts slice in the Redux store.

