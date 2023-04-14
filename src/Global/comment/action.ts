import { createAsyncThunk } from "@reduxjs/toolkit";
import { IComment } from "../../models/Comments";
import { AxiosError } from "axios";
import { IApiError } from "../../models/Error";
import { alertAC } from "../alert/alertSlice";
import { createComment, getComments, replyComment } from "../../services/commentsService";
import { ICommentState } from "./slice";

export const createCommentAC = createAsyncThunk<IComment, IComment, { rejectValue: IApiError }>('create_comment', async (comment,{dispatch,rejectWithValue}) => {
    try {
        const { data } = await createComment(comment);
        return {...data,user:comment.user}
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


export const getCommentsAC = createAsyncThunk<ICommentState, {id:string,num:any}, { rejectValue: IApiError }>('get_comment', async (payload, { dispatch, rejectWithValue }) => {
    try {
        dispatch(alertAC.startLoading());

        let limit = 4
        const { data } = await getComments(payload.id, payload.num, limit);
        dispatch(alertAC.stopLoading());

        return { comments:data.comments, total: data.total }
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


export const replyCommentAC = createAsyncThunk<IComment, IComment, { rejectValue: IApiError }>('reply_comment', async (comment, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await replyComment(comment);
        return { ...data, user: comment.user, reply_user: comment.reply_user }
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

export const updateCommentAC = createAsyncThunk<IComment, IComment, { rejectValue: IApiError }>('update_comment', async (comment, { dispatch, rejectWithValue }) => {
    try {
        // const { data } = await replyComment(comment);
        return comment
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
export const updateReplyAC = createAsyncThunk<IComment, IComment, { rejectValue: IApiError }>('update_replied_comment', async (comment, { dispatch, rejectWithValue }) => {
    try {
        // const { data } = await replyComment(comment);
        return comment
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