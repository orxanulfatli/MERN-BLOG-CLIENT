import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IApiError } from "../../models/Error";
import {
  IAuthResponse,
  ILoginCredentials,
  IRegisterCredentials,
  IRegisterResponse,
} from "../../models/User";
import {
  checkAuth,
  login,
  logout,
  register,
  sendOTP,
  verifyOTP,
} from "../../services/authService";
import { alertAC } from "../alert/alertSlice";

export const loginAC = createAsyncThunk<
  IAuthResponse,
  ILoginCredentials,
  { rejectValue: IApiError }
>("login", async (payload, { rejectWithValue, dispatch }) => {
  try {
    dispatch(alertAC.startLoading());
    const { data } = await login(payload);
    
   
    
    localStorage.setItem("loggin", "true");
    dispatch(alertAC.stopLoading());
    return data as IAuthResponse;
  } catch (error: any) {
    let err: AxiosError<IApiError> = error;

    // if (err.response) {
    //   dispatch(alertAC.error(err.response.data));
    // } else {
    //   dispatch(alertAC.error(error));
    // }
    dispatch(alertAC.stopLoading());

    if (!err.response) throw error;
    return rejectWithValue(err.response.data);
  }
});

export const registerAC = createAsyncThunk<
  IRegisterResponse,
  IRegisterCredentials,
  { rejectValue: IApiError }
>("register", async (payload, { rejectWithValue, dispatch }) => {
  try {
    dispatch(alertAC.startLoading());
    const { data } = await register(payload);
    dispatch(alertAC.stopLoading());
    return data;
  } catch (error: any) {
    let err: AxiosError<IApiError> = error;

    // if (err.response) {
    //   dispatch(alertAC.error(err.response.data));
    // } else {
    //   dispatch(alertAC.error(error));
    // }
    dispatch(alertAC.stopLoading());

    if (!err.response) throw error;
    return rejectWithValue(err.response.data);
  }
});

export const checkAuthAC = createAsyncThunk<
  IAuthResponse,
  undefined,
  { rejectValue: IApiError }
>("checkAuth", async (_, { rejectWithValue }) => {
  try {
    const { data } = await checkAuth();
    localStorage.setItem("loggin", "true");
    return data;
  } catch (error: any) {
    let err: AxiosError<IApiError> = error;

    if (!err.response) throw error;
    return rejectWithValue(err.response.data);
  }
});

export const logoutAC = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("loggin");
      await logout();
      window.location.href = "/";
    } catch (error: any) {
      let err: AxiosError<IApiError> = error;

      if (!err.response) throw error;
      return rejectWithValue(err.response.data);
    }
  }
);

export const sendOtpAC = createAsyncThunk<
  { to: string },
  { phone: string },
  { rejectValue: IApiError }
>("send-otp", async (payload, { rejectWithValue, dispatch }) => {
  try {
    dispatch(alertAC.startLoading());
    const { data } = await sendOTP(payload);
    dispatch(alertAC.stopLoading());
    return data;
  } catch (error: any) {
    let err: AxiosError<IApiError> = error;

    dispatch(alertAC.stopLoading());

    if (!err.response) throw error;
    return rejectWithValue(err.response.data);
  }
});

export const verifyOtpAC = createAsyncThunk<
  IAuthResponse,
  { phone: string; code: string },
  { rejectValue: IApiError }
>("verify-otp", async (payload, { rejectWithValue, dispatch }) => {
  try {
    dispatch(alertAC.startLoading());
    const { data } = await verifyOTP(payload);
    localStorage.setItem("loggin", "true");
    dispatch(alertAC.stopLoading());
    return data as IAuthResponse;
  } catch (error: any) {
    let err: AxiosError<IApiError> = error;

    dispatch(alertAC.stopLoading());

    if (!err.response) throw error;
    return rejectWithValue(err.response.data);
  }
});
