import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface ISocketState {
    socket?:Socket|any
}
const initialState: ISocketState = {
    
}
const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        socket: (state, action: PayloadAction<Socket>) => {
            state.socket = action.payload
            
        }
    }
    
})

export const socketReducer = socketSlice.reducer;
export const socketAC = socketSlice.actions;