import { IAuth, ILoginCredentials, IRegister, IRegisterCredentials } from "../models/User"
import { $mainAPi } from "./config"
import { LOGIN_URL, REGISTER_URL, ACTIVATE_URL, REFRESH_URL, LOGOUT_URL, VERIFY_OTP_URL, SEND_OTP_URL } from "./constants"

export const login = async (data: ILoginCredentials) => {
      return $mainAPi.post<IAuth>(LOGIN_URL, data)
}

export const register = async (data: IRegisterCredentials) => {
      return $mainAPi.post<IRegister>(REGISTER_URL, data)
}
export const activateAccount = async (data: { activeToken: string }) => {
      return $mainAPi.post<{ message: string }>(ACTIVATE_URL, data)
}

export const checkAuth = async () => {
      return $mainAPi.get<{ message: string, accessToken: string }>(REFRESH_URL)
}
export const logout = async () => {
      return $mainAPi.get(LOGOUT_URL)
}

export const sendOTP = async (data: { phone: string }) => {
      return $mainAPi.post(SEND_OTP_URL, data)
}
export const verifyOTP = async (data: { phone: string,code:string }) => {
      return $mainAPi.post<IAuth>(VERIFY_OTP_URL, data)
}





