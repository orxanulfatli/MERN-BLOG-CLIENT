import axios from "axios";
import { checkAuthAC } from "../Global/auth/action";
import {AppStore} from '../Global/store'
import { apiUrl } from "./constants";
export const $mainAPi = axios.create({
    baseURL: apiUrl,
    withCredentials: true
}
)
export const $api = axios.create({
    baseURL: apiUrl,
    withCredentials: true
})

let store: AppStore;
export const injectStore = (_store: AppStore) => {
    store= _store
}
   
$api.interceptors.request.use((config) => {
    const accessToken = store.getState().authReducer.accessToken;

        config.headers.Authorization = `Bearer ${accessToken}`
        return config
    }, (error) => console.log(error))

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        const {dispatch} =store

        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                 await dispatch(checkAuthAC())
                return $api.request(originalRequest);
            } catch (error) {
                console.log(error);
            }
        }
        throw error;
    }
);