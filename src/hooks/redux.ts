import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../Global/store';

export const useAppDispatch = () => useDispatch() as AppDispatch
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector

