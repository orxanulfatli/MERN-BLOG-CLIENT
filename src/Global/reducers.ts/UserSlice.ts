import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit"
import { getUsers } from "./actions"

export interface IUser {
    id: string
    name: string
    email: string
}

interface UserState {
    users: IUser[]
    isLoading: boolean
    error: string|undefined
    count:number
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: '',
    count:0
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // usersFetching(state) { 
        //     state.isLoading = true
        // },
        // usersFetchingSuccess(state, action: PayloadAction<IUser[]>) {
        //     state.isLoading = false;
        //     state.error.message = '';
        //     state.users=action.payload

        //  },
        // usersFetchingError(state, action: PayloadAction<string>) {
        //     state.isLoading = false;
            
        // }
    },
    extraReducers(builder) {
        builder.addCase(getUsers.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getUsers.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.error = ''
            state.users = payload
        });
        builder.addCase(getUsers.rejected, (state,{payload,error}) => {
            state.isLoading = false;
            if (payload) {
                state.error = payload
            } else {
                state.error = error.message
            }
            
        })
    },

})

export default userSlice.reducer