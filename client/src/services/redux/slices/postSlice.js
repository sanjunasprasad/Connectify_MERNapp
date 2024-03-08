import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  posts: [],
  comments: [],
  usernames: [],
  userpic: [],
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
      const { postId, isLiked } = action.payload;
      const post = state.posts.find(post => post._id === postId);
      if (post) {
        post.isLiked = isLiked;
        post.likesCount += isLiked ? 1 : -1; // Increment or decrement likes count
      }
    },
    updateCommentsAndUsers: (state, action) => {
      const { comments, usernames, userpic } = action.payload;
      state.comments = comments;
      state.usernames = usernames;
      state.userpic = userpic;
    },
  },
});

export const { setPosts , addPost ,toggleLike,updateCommentsAndUsers } = postSlice.actions; // action created and reducer fn
export default postSlice.reducer;   //reducer fn generated used to update the state of the posts slice in the Redux store.

