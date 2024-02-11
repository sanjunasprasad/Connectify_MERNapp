import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../slices/postSlice';

const store = configureStore({
  reducer: {
    createpost: postReducer,
  },
});

export default store;