import { createSlice } from "@reduxjs/toolkit";
import { IHomeBlogs } from "../../models/Blog";
import { getHomeBlogsAC } from "./action";

interface IBlogState {
    homeBlogs:IHomeBlogs[]
}
const initialState: IBlogState = {
    homeBlogs:[]
}

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {},
    extraReducers:(builder)=> {
        builder.addCase(getHomeBlogsAC.fulfilled, (state, action) => {
            const{payload} =action
            state.homeBlogs=payload
        })
    },
})


export const blogReducer = blogSlice.reducer