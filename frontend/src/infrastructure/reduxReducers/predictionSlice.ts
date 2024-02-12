import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PredictionState {
    predictionData: Map<number, string>
}

const initialState: PredictionState = {
    predictionData: new Map<number, string>(),
};

export const predictionSlice = createSlice({
    name: 'predictions',
    initialState,
    reducers: {
        addPrediction: (state, action: PayloadAction<{ index: number, data: string }>) => {
            const { index, data } = action.payload;
            state.predictionData.set(index, data);
        },
    },    
});

export const { addPrediction } = predictionSlice.actions;
export default predictionSlice.reducer;