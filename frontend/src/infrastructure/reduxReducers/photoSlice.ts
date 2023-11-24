import { createSlice } from "@reduxjs/toolkit";

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
            state.photoList.splice(action.payload, 1);
        }
    }
})

export const { addPhoto, removePhoto } = photosSlice.actions;
export default photosSlice.reducer;