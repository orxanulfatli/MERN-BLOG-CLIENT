import { createSlice } from "@reduxjs/toolkit"
import { IComment } from "../../models/Comments"
import { createCommentAC, getCommentsAC, replyCommentAC, updateCommentAC, updateReplyAC } from "./action"

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
    reducers: {
        updateComment: (state,action) => {
            
        },
         updateReply: (state, action) => {
        
        }
    },
    extraReducers: (builder) => {
        //create comment
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

        //reply comments
        builder.addCase(replyCommentAC.fulfilled, (state, action) => {
            const { payload } = action
            state.isLoading = false
            state.comments = state.comments.map(item => (
                item._id === payload.comment_root
                    ? {
                        ...item,
                        replyCM: [
                            payload,
                            ...item.replyCM as [],
                        ]
                    }
                    : item
            ))
        })

        //update comments 
        builder.addCase(updateCommentAC.fulfilled, (state, action) => {
            const { payload } = action;
            state.comments = state.comments.map(item => (
                item._id === payload._id
                    ? payload
                    : item
            ))
        })

        //update replied comments
        builder.addCase(updateReplyAC.fulfilled, (state, action) => {
            const { payload } = action
            state.comments = state.comments.map(item => (
                item._id === payload.comment_root
                    ? {
                        ...item,
                        replyCM: item.replyCM?.map(rp => (
                            rp._id === payload._id
                                ? payload
                                : rp
                        ))
                    }
                    : item
            ))
        })
        
    },
})

export const commentReducer = commentSlice.reducer;
