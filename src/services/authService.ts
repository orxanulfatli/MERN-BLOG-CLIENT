import { IAuth, ILoginCredentials,IRegisterCredentials } from "../models/User"
import { $mainAPi } from "./config"
import { LOGIN_URL,REGISTER_URL } from "./constants"

export const login = async (data: ILoginCredentials) => {
      return $mainAPi.post<IAuth>(LOGIN_URL, data)
}

export const register = async (data: IRegisterCredentials) => {
      return $mainAPi.post(REGISTER_URL, data)
}

