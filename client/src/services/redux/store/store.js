import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../slices/postSlice'; // all reducer fn defined in reducer object in slice

const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

export default store;