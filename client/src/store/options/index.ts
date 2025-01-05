import authService from "@/services/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface OptionState {

}

const initialState: OptionState = {

};

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {},

});


export const {} = optionsSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default optionsSlice.reducer;
