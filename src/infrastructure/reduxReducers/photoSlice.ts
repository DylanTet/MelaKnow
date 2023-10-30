import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../reduxStore";

interface PhotoState {
    photoList: string[],
}

const initialState: PhotoState = {
    photoList: [],
};

export const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        addPhoto: (state, action) => {state.photoList.push(action.payload)},
        removePhoto(state, action) {
            state.photoList = [...state.photoList.slice(0, action.payload), ...state.photoList.slice(action.payload + 1)]
        }
    }
})

export const { addPhoto, removePhoto } = photosSlice.actions;
export default photosSlice.reducer;