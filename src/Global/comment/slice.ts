import { createSlice } from "@reduxjs/toolkit"
import { IComment } from "../../models/Comments"
import { createCommentAC } from "./action"

interface ICommentState {
    isLoading:boolean
    comments: IComment[]
    total:number
}
const initialState: ICommentState = {
    isLoading:false,
    comments: [],
    total:1
}

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //create comment
        builder.addCase(createCommentAC.pending, (state, action) => {
            state.isLoading = true
            
        })
        builder.addCase(createCommentAC.fulfilled, (state, action) => {
            const{payload} = action
            state.isLoading = false
            state.comments.push(payload)
        })
        
    },
})

export const commentReducer = commentSlice.reducer;