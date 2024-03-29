import { combineReducers, configureStore, } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
import { alertReducer } from './alert/alertSlice';
import { categoryReducer } from './category/slice';
import { blogReducer } from './blog/slice';
import { profileReducer } from './profile/slice';
import { commentReducer } from './comment/slice';
import { socketReducer } from './socket/socket';

const rootReducer = combineReducers({
    authReducer,
    alertReducer,
    categoryReducer,
    blogReducer,
    profileReducer,
    commentReducer,
    socketReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']