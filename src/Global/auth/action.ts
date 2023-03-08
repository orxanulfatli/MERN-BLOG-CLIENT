import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IApiError } from "../../models/Error";
import { IAuth, ILoginCredentials,IRegisterCredentials } from "../../models/User";
import { login,register } from "../../services/authService";
import { alertAC } from "../alert/alertSlice";

export const loginAC = createAsyncThunk<
  IAuth,
  ILoginCredentials,
  { rejectValue: IApiError }
  >("login", async (payload, { rejectWithValue, dispatch }) => {
  try {
    dispatch(alertAC.loading())
    const { data } = await login(payload);
    dispatch(alertAC.success());
    return data as IAuth;
  } catch (error: any) {
    let err: AxiosError<IApiError> = error;

    // if (err.response) {
    //   dispatch(alertAC.error(err.response.data));
    // } else {
    //   dispatch(alertAC.error(error));
    // }
    dispatch(alertAC.error())

    if (!err.response) throw error;
    return rejectWithValue(err.response.data);
  }
  });

export const registerAC = createAsyncThunk<
  {
    success: boolean,
    message: string
  },
  IRegisterCredentials,
  { rejectValue: IApiError }
>("register", async (payload, { rejectWithValue, dispatch }) => {
  try {
    dispatch(alertAC.loading())
    const { data } = await register(payload);
    dispatch(alertAC.success());
    return data ;
  } catch (error: any) {
    let err: AxiosError<IApiError> = error;

    // if (err.response) {
    //   dispatch(alertAC.error(err.response.data));
    // } else {
    //   dispatch(alertAC.error(error));
    // }
    dispatch(alertAC.error())

    if (!err.response) throw error;
    return rejectWithValue(err.response.data);
  }
});

  
