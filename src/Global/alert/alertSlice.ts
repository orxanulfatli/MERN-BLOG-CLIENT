import { createSlice } from "@reduxjs/toolkit";
// import { IApiError } from "../../models/Error";

type AlertType = {
    // message:string|string[]|null
    isLoading: boolean
    // error: IApiError |null
}

const initialState: AlertType = {
    // message:null,
    isLoading: false,
    // error: null
}


const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true
            // state.error = null
        },
        // success: (state, /*action: PayloadAction<string | string[]>*/) => {
        //     // const {payload} = action
        //     // state.message=payload
        //     state.isLoading = false
        //     // state.error=null
        // },
        // error: (state, action: PayloadAction<IApiError>) => {
        //     const { payload } = action
        //     state.isLoading = false
        //     state.error=payload
        // }
        stopLoading: (state) => {
            state.isLoading = false
        }
    }
})

export const alertReducer = alertSlice.reducer
export const alertAC = alertSlice.actions
