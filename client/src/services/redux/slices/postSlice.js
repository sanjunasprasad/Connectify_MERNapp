// postsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = { // its inital state(posts slice)
  // formData: null,
  posts: [],
};


//create a post slice fn named posts
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {   //list of reducer functions
    // addNewPost: (state, action) => {  // state: current state, action:action dispatched to slice, reducer fn name : addNewPost
    //   state.posts = action.payload; // action.payload or new data is added to formdata in the posts slice's state
    // },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { setPosts } = postSlice.actions; // action created and reducer fn

export default postSlice.reducer;   //reducer fn generated used to update the state of the posts slice in the Redux store.

