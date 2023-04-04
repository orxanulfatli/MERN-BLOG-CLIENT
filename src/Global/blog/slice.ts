import { createSlice } from "@reduxjs/toolkit";
import { IBlog, IBlogsCategory, IHomeBlogs } from "../../models/Blog";
import { createBlogAC, getBlogsByCategoryAC, getHomeBlogsAC } from "./action";

interface IBlogState {
    homeBlogs: IHomeBlogs[]
    newBlog: IBlog | null
    categoryBlogs:IBlogsCategory[]
}
const initialState: IBlogState = {
    homeBlogs: [],
    newBlog: null,
    categoryBlogs:[]
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

        //blogs by category
        builder.addCase(getBlogsByCategoryAC.fulfilled, (state, action) => {
            const { payload } = action;
            if (state.categoryBlogs.every(item => item.id !== payload.id)) {
                state.categoryBlogs.push(payload) 

            } else {
                state.categoryBlogs = state.categoryBlogs.map(blog => (blog.id === payload.id
                    ? payload
                    : blog))
            }
        })
    },
})


export const blogReducer = blogSlice.reducer