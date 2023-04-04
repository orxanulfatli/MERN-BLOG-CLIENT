import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IApiError } from "../../models/Error";
import { IUser } from "../../models/User";
import { imageUpload, updateUser,resetPassword, getOtherInfo } from "../../services/authService";
import { alertAC } from "../alert/alertSlice";

export const updateUserAC = createAsyncThunk<
  { message: string },
  { name: string; avatar: null | File },
  { rejectValue: IApiError }
>("update_user", async (payload, { dispatch, rejectWithValue }) => {
  try {
    dispatch(alertAC.startLoading());

    //image upload
    let url = "";
    if (payload.avatar) {
      const photo = await imageUpload(payload.avatar as File);
      url = photo.url;
      console.log(url);
    }
    const { data } = await updateUser({ name: payload.name, avatar: url });
    dispatch(alertAC.success(data.message));
    return data;
  } catch (error: any) {
    let err: AxiosError<IApiError> = error;
    if (err.response) {
      dispatch(alertAC.error(err.response.data));
    } else {
      dispatch(alertAC.error(error));
    }
    if (!err.response) throw error;
    return rejectWithValue(err.response.data);
  }
});

export const resetPasswordAC = createAsyncThunk<
  { message: string },
  { password: string },
  { rejectValue: IApiError }
  >("reset-password", async (payload, { dispatch, rejectWithValue }) => {
  try {
    dispatch(alertAC.startLoading());
    const { data } = await resetPassword(payload)
    dispatch(alertAC.success(data.message));

    return data

    
  } catch (error:any) {
    let err: AxiosError<IApiError> = error;
    if (err.response) {
      dispatch(alertAC.error(err.response.data));
    } else {
      dispatch(alertAC.error(error));
    }
    if (!err.response) throw error;
    return rejectWithValue(err.response.data);
  }
  });

export const getOtherInfoAC = createAsyncThunk<IUser, string, { rejectValue: IApiError }
>('other_info', async (id,{dispatch,rejectWithValue}) => {
    try {
      const { data } = await getOtherInfo(id);
      return data
    } catch (error:any) {
      let err: AxiosError<IApiError> = error;
      if (err.response) {
        dispatch(alertAC.error(err.response.data));
      } else {
        dispatch(alertAC.error(error));
      }
      if (!err.response) throw error;
      return rejectWithValue(err.response.data);
    }
  })
