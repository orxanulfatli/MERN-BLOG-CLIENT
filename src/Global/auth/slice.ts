import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { IApiError } from "../../models/Error";
import { IUser } from "../../models/User";
import { loginAC,registerAC } from "./action";

interface IAuthState {
  // isLoading: boolean;
  user: IUser | null;
  error: IApiError | null;
  message?:string
}

const initialState: IAuthState = { user: null, error: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //login
    builder
      // .addCase(loginAC.pending, startLoading)
      .addCase(loginAC.fulfilled, (state, { payload }) => {
        state.error = null;
        state.user = payload.user;

      })
      .addCase(loginAC.rejected, (state, action) => {
        const { payload, error } = action
        if (payload) {
          state.error = payload
        } else {
          state.error = error
          
        }
      });
    
    //register
    builder
      .addCase(registerAC.fulfilled, (state, action) => { 
        const { payload } = action
        state.error = null
        state.message=payload.message
      })
      .addCase(registerAC.rejected, (state, action) => {
        const { payload, error } = action;
        if (payload) {
          state.error = payload
        } else {
          state.error = error

        }
       })
    
    
    
  },
});

function startLoading(state: any) {
  state.isLoading = true
  state.error = null

}
function recieveErrors(state: any, { payload, error }: any) {
  state.isLoading = false
  if (payload) {
    state.error = payload
  } else {
    state.error = error
  }
}

export const authReducer = authSlice.reducer
