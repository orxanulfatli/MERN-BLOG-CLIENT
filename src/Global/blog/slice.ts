import { createSlice } from "@reduxjs/toolkit";
import { IBlog, IHomeBlogs } from "../../models/Blog";
import { createBlogAC, getHomeBlogsAC } from "./action";

interface IBlogState {
    homeBlogs: IHomeBlogs[]
    newBlog:IBlog|null
}
const initialState: IBlogState = {
    homeBlogs: [],
    newBlog:null
}

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //get home blogs
        builder.addCase(getHomeBlogsAC.fulfilled, (state, action) => {
            const { payload } = action
            state.homeBlogs = payload
        })

        // create new blog
        builder.addCase(createBlogAC.fulfilled, (state,action) => {
            const { payload } = action
            state.newBlog = payload
        })
    },
})


export const blogReducer = blogSlice.reducer