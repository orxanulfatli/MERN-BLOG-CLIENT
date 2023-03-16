import { createSlice } from "@reduxjs/toolkit";

interface IProfileState {
  message: string | null;
}

const initialState: IProfileState = {
  message: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
    reducers: {},
  extraReducers:(builder) => {
      
  },
});
