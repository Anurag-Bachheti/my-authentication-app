import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionExpired: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSessionExpired: (state, action) => {
      state.sessionExpired = action.payload;
    },
  },
});

export const { setSessionExpired } = authSlice.actions;
export default authSlice.reducer;
