import { combineReducers, configureStore, } from '@reduxjs/toolkit'
import { authReducer } from './auth/slice';
import { alertReducer } from './alert/alertSlice'

const rootReducer = combineReducers({
    authReducer,
    alertReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']