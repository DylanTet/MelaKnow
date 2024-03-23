import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PredictionState {
    predictionData: Array<string>;
}

const initialState: PredictionState = {
    predictionData: [],
};

export const predictionSlice = createSlice({
    name: 'predictions',
    initialState,
    reducers: {
        addPrediction: (state, action: PayloadAction<{ data: string }>) => {
            const { data } = action.payload;
            state.predictionData.push(data);
        },
    },    
});

export const { addPrediction } = predictionSlice.actions;
export default predictionSlice.reducer;
