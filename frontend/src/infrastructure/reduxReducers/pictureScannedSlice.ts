import { PayloadAction, createSlice  } from "@reduxjs/toolkit";

type PictureStates = {
  pictureStates: Array<boolean>;
}

const initialState: PictureStates = {
  pictureStates: [],
}

const pictureScannedSlice = createSlice({
  name: 'pictureScanned',
  initialState,
  reducers: {
    setPictureScanned: (state, action: PayloadAction<{ status: boolean }>) => {
      const { status } = action.payload;
      state.pictureStates.push(status);
    }
  }
});

export const { setPictureScanned } = pictureScannedSlice.actions;
export default pictureScannedSlice.reducer;
