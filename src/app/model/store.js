import { configureStore } from '@reduxjs/toolkit';
import { partsReducer } from '../../entities/part';

export const store = configureStore({
  reducer: { parts: partsReducer },
});
