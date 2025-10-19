import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

/**
 * Typed version of useDispatch hook with full TypeScript support.
 * Provides autocomplete and type checking for all available actions.
 * @returns {AppDispatch} Typed dispatch function
 * @example
 * const dispatch = useAppDispatch();
 * dispatch(fetchStudents()); // ✅ TypeScript knows this action exists
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed version of useSelector hook with full TypeScript support.
 * Provides autocomplete and type checking for state selection.
 * @type {TypedUseSelectorHook<RootState>}
 * @example
 * const students = useAppSelector(state => state.students); // ✅ Full autocomplete
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;