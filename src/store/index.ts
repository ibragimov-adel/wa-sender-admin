import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from '../api/api';
import { logsSlice } from './slices/LogsSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [logsSlice.name]: logsSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
