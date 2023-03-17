import axios, { AxiosPromise, AxiosResponse } from "axios";
import {
  IAuthResponse,
  ILoginCredentials,
  IRegisterResponse,
  IRegisterCredentials,
} from "../models/User";
import { $mainAPi, $api } from "./config";
import {
  LOGIN_URL,
  REGISTER_URL,
  ACTIVATE_URL,
  REFRESH_URL,
  LOGOUT_URL,
  VERIFY_OTP_URL,
  SEND_OTP_URL,
  UPDATE_USER,
} from "./constants";

export const login = async (data: ILoginCredentials) => {
  return $mainAPi.post<IAuthResponse>(LOGIN_URL, data);
};
export const register = async (data: IRegisterCredentials) => {
  return $mainAPi.post<IRegisterResponse>(REGISTER_URL, data);
};
export const activateAccount = async (data: { activeToken: string }) => {
  return $mainAPi.post<{ message: string }>(ACTIVATE_URL, data);
};

export const checkAuth = async () => {
  return $mainAPi.get<IAuthResponse>(REFRESH_URL);
};

export const logout = async () => {
  return $mainAPi.get(LOGOUT_URL);
};

export const sendOTP = async (data: { phone: string }) => {
  return $mainAPi.post(SEND_OTP_URL, data);
};
export const verifyOTP = async (data: { phone: string; code: string }) => {
  return $mainAPi.post<IAuthResponse>(VERIFY_OTP_URL, data);
};

export const updateUser = async (data:{name:string,avatar:null|string}) => {
      return $api.patch<{message:string}>(UPDATE_USER,data);
};
export const imageUpload = async (file: File) => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "gttjcapw")
  formData.append("cloud_name", "dtnqoymrd")

  const { data } = await axios.post('https://api.cloudinary.com/v1_1/dtnqoymrd/upload',formData)
  return { public_id: data.public_id, url: data.secure_url };
}