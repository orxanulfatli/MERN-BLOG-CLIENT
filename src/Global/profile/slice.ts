import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/User";
import { getOtherInfoAC } from "./action";

interface IProfileState {
  message: string | null;
  otherUser: IUser[] 
  isLoading:boolean
}

const initialState: IProfileState = {
  message: null,
  otherUser: [],
  isLoading:false
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
    reducers: {},
  extraReducers:(builder) => {
      //get other info
    builder.addCase(getOtherInfoAC.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getOtherInfoAC.fulfilled, (state, action) => {
      const { payload } = action;
      state.isLoading=false
      state.otherUser?.push(payload)
    })
    builder.addCase(getOtherInfoAC.rejected, (state) => {
      state.isLoading=false
    })
  },
});

export const profileReducer = profileSlice.reducer
