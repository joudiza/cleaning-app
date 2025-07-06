import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import roomsReducer from '../features/roomsSlice';

 const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomsReducer,
  },
});

export default store