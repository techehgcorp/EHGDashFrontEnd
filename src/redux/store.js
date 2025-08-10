import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '@/redux/menuSlice/menuSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
  },
});
