import { configureStore } from '@reduxjs/toolkit';
import queryBuilderSlice from './slices/queryBuilderSlice';

const store = configureStore({
  reducer: {
    queryBuilder: queryBuilderSlice,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export default store;
