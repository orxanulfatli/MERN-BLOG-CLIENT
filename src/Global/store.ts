import { combineReducers, configureStore, } from '@reduxjs/toolkit'
import { authReducer } from './auth/slice';
import { alertReducer } from './alert/alertSlice'
import { categoryReducer } from './category/slice'
import {blogReducer} from './blog/slice'

const rootReducer = combineReducers({
    authReducer,
    alertReducer,
    categoryReducer,
    blogReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']