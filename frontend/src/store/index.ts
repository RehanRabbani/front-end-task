import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './studentSlice';

/**
 * Redux store configuration using Redux Toolkit.
 * Includes Redux DevTools, Immer for immutable updates, and thunk middleware.
 * @constant {import('@reduxjs/toolkit').EnhancedStore}
 */
export const store = configureStore({
  reducer: {
    /** Student management state slice */
    students: studentReducer,
  },
});

/**
 * Type representing the complete application state shape.
 * Inferred automatically from the store configuration.
 * @typedef {Object} RootState
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type representing the store's dispatch function with thunk support.
 * Includes all available action creators and async thunks.
 * @typedef {Function} AppDispatch
 */
export type AppDispatch = typeof store.dispatch;