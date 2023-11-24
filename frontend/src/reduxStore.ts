import { configureStore } from '@reduxjs/toolkit';
import photoReducer from './infrastructure/reduxReducers/photoSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        userPhotos: photoReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
