import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../slices/postSlice'; // all reducer fn defined in reducer object in slice
import userReducer from '../slices/userSlice';

const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
  },
});

export default store;