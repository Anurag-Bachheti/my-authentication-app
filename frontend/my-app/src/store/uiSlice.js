import { createSlice } from "@reduxjs/toolkit";

const  initialState = {
    globalLoading: false,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        showLoader: (state) => {
            state.globalLoading = true;
        },
        hideLoader: (state) => {
            state.globalLoading = false;
        },
    },
})

export const { showLoader, hideLoader } = uiSlice.actions;
export default uiSlice.reducer;