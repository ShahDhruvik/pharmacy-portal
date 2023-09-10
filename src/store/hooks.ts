// Two hooks useAppDispatch and useAppSelector for accessing the states and defined functions
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 *
 * Use these hooks instead of hooks provided by react-redux
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
