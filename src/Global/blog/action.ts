import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IBlog, IBlogsCategory, IBlogsUser, IHomeBlogs } from "../../models/Blog";
import { IApiError } from "../../models/Error";
import { imageUpload } from "../../services/authService";
import { createBlog, getBlogsByCategory, getBlogsByUser, getHomeBlogs } from "../../services/blogService";
import { alertAC } from "../alert/alertSlice";

export const createBlogAC = createAsyncThunk<IBlog, IBlog, { rejectValue: IApiError }
>('create_blog', async (blog,{dispatch,rejectWithValue}) => {
    try {
        dispatch(alertAC.startLoading());
        let url = "";
        if (typeof(blog.thumbnail)!=='string') {
            const photo = await imageUpload(blog.thumbnail as File);
            url = photo.url;
        } else {
            url=blog.thumbnail
        }
        const newData:IBlog = { ...blog, thumbnail: url }
        const { data } = await createBlog(newData);
        dispatch(alertAC.success("Blog created!"));
        console.log(data)
        return data
    } catch (error:any) {
        let err: AxiosError<IApiError> = error;
        if (err.response) {
            dispatch(alertAC.error(err.response.data));
        } else {
            dispatch(alertAC.error(error));
        }
        if (!err.response) throw error;
        return rejectWithValue(err.response.data);
    }
})

export const getHomeBlogsAC = createAsyncThunk<IHomeBlogs[], undefined, { rejectValue: IApiError }
>('home_blog', async (_, { dispatch, rejectWithValue }) => {
    try {
        dispatch(alertAC.startLoading());
    
        const { data } = await getHomeBlogs();
        dispatch(alertAC.stopLoading());
        return data
    } catch (error: any) {
        let err: AxiosError<IApiError> = error;
        if (err.response) {
            dispatch(alertAC.error(err.response.data));
        } else {
            dispatch(alertAC.error(error));
        }
        if (!err.response) throw error;
        return rejectWithValue(err.response.data);
    }
})

export const getBlogsByCategoryAC = createAsyncThunk<IBlogsCategory, {categoryId:string,search?:string}, { rejectValue: IApiError }
>('category_blog', async (payload, { dispatch, rejectWithValue }) => {
    try {
        dispatch(alertAC.startLoading());
        let limit = 8;
        let value = payload.search ? payload.search : `?page=${1}`;

        const { data } = await getBlogsByCategory(payload.categoryId,value,limit);

        dispatch(alertAC.stopLoading());
        return {...data,id:payload.categoryId,search:payload.search}
    } catch (error: any) {
        let err: AxiosError<IApiError> = error;
        if (err.response) {
            dispatch(alertAC.error(err.response.data));
        } else {
            dispatch(alertAC.error(error));
        }
        if (!err.response) throw error;
        return rejectWithValue(err.response.data);
    }
})

export const getBlogsByUserAC = createAsyncThunk<IBlogsUser, { id: string, search?: string }, { rejectValue: IApiError }>('user_blog', async (payload,{dispatch,rejectWithValue}) => {
    try {

        dispatch(alertAC.startLoading());

        let limit = 8;
        let value = payload.search ? payload.search : `?page=${1}`;
        const { data } = await getBlogsByUser(payload.id, value, limit);
        dispatch(alertAC.stopLoading());

        return {...data,id:payload.id,search:payload.search}
    } catch (error:any) {
        let err: AxiosError<IApiError> = error;
        if (err.response) {
            dispatch(alertAC.error(err.response.data));
        } else {
            dispatch(alertAC.error(error));
        }
        if (!err.response) throw error;
        return rejectWithValue(err.response.data);
    }
})