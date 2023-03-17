import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IApiError } from "../../models/Error";

type AlertType = {
    message:string|string[]|null
    isLoading: boolean
    error: null|string|string[]
}

const initialState: AlertType = {
    message:null,
    isLoading: false,
    error: null
}


const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true
            state.error = null
            state.message = null
        },
        success: (state, action: PayloadAction<string | string[] | null>) => {
            const {payload} = action
            state.message=payload
            state.isLoading = false
            state.error=null
        },
        error: (state, action: PayloadAction<any>) => {
            const { payload } = action
            state.isLoading = false
            state.error = payload.message
           
        },
        stopLoading: (state) => {
            state.isLoading = false
            state.error = null
            state.message = null
        }
    }
})

export const alertReducer = alertSlice.reducer
export const alertAC = alertSlice.actions
