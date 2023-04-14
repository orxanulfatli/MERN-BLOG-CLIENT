import { createSlice } from "@reduxjs/toolkit"
import { IComment } from "../../models/Comments"
import { createCommentAC, getCommentsAC } from "./action"

export interface ICommentState {
    isLoading?:boolean
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
            // state.isLoading = true
            
        })
        builder.addCase(createCommentAC.fulfilled, (state, action) => {
            const{payload} = action
            state.isLoading = false
            state.comments.push(payload)
        })

        //get comments 
        builder.addCase(getCommentsAC.pending, (state) => {
            state.isLoading = true
            
        })
        builder.addCase(getCommentsAC.fulfilled, (state, action) => {
            const {payload} = action
            state.comments = payload.comments;
            state.total = payload.total
            state.isLoading = false

        })
        
    },
})

export const commentReducer = commentSlice.reducer;