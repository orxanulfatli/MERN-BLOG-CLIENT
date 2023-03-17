import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { IApiError } from "../../models/Error";
import { IAuthResponse, IUser } from "../../models/User";
import { verifyOTP } from "../../services/authService";
import {
  checkAuthAC,
  loginAC,
  registerAC,
  sendOtpAC,
  verifyOtpAC,
} from "./action";

interface IAuthState {
  // isLoading: boolean;
  isAuth: boolean;
  message?: string;
  user: IUser | null;
  accessToken: string | null;
  error: IApiError | null;
  phone?: string | null;
}

const initialState: IAuthState = {
  isAuth: false,
  user: null,
  accessToken: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //login
    builder
      // .addCase(loginAC.pending, startLoading)
      .addCase(loginAC.fulfilled, loginSuccess)
      .addCase(loginAC.rejected, (state, action) => {
        const { payload, error } = action;
        state.isAuth = false;
        state.accessToken = null;
        state.user = null;
        if (payload) {
          state.error = payload;
        } else {
          state.error = error;
        }
      });

    //register
    builder
      .addCase(registerAC.fulfilled, (state, action) => {
        const { payload } = action;
        state.error = null;
        state.message = payload.message;
      })
      .addCase(registerAC.rejected, (state, action) => {
        const { payload, error } = action;
        if (payload) {
          state.error = payload;
        } else {
          state.error = error;
        }
      });

    //checkAuth
    builder
      .addCase(checkAuthAC.fulfilled, loginSuccess)
      .addCase(checkAuthAC.rejected, (state, action) => {
        const { payload, error } = action;
        state.isAuth = false;
        state.accessToken = null;
        state.user = null;
        if (payload) {
          state.error = payload;
        } else {
          state.error = error;
        }
      });

    //send otp
    builder
      .addCase(sendOtpAC.fulfilled, (state, { payload }) => {
        state.error = null;
        state.phone = payload.to;
      })
      .addCase(sendOtpAC.rejected, (state, action) => {
        const { payload, error } = action;

        if (payload) {
          state.error = payload;
        } else {
          state.error = error;
        }
      });

    //verify otp
    builder
      .addCase(verifyOtpAC.fulfilled, loginSuccess)
      .addCase(verifyOtpAC.rejected, (state, action) => {
        const { payload, error } = action;
        state.isAuth = false;
        state.accessToken = null;
        state.user = null;
        if (payload) {
          state.error = payload;
        } else {
          state.error = error;
        }
      });
  },
});

function recieveErrors(state: IAuthState, action: any) {
  const { payload, error } = action;
  if (payload) {
    state.error = payload;
  } else {
    state.error = error;
  }
}

function loginSuccess(state: IAuthState, action: PayloadAction<IAuthResponse>) {
  const { payload } = action;
  state.error = null;
  state.user = payload.user;
  state.isAuth = true;
  state.accessToken = payload.accessToken;
}

export const authReducer = authSlice.reducer;
