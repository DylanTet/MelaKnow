import { configureStore } from '@reduxjs/toolkit';
import photoReducer from './infrastructure/reduxReducers/photoSlice';
import { useDispatch } from 'react-redux';
import predictionSlice from './infrastructure/reduxReducers/predictionSlice';
import pictureScannedSlice from './infrastructure/reduxReducers/pictureScannedSlice';

export const store = configureStore({
    reducer: {
        userPhotos: photoReducer,
        picturePredictions: predictionSlice,
        pictureStates: pictureScannedSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
