import { createAsyncThunk } from "@reduxjs/toolkit";
import { IComment } from "../../models/Comments";
import { AxiosError } from "axios";
import { IApiError } from "../../models/Error";
import { alertAC } from "../alert/alertSlice";
import { createComment, getComments } from "../../services/commentsService";
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


export const getCommentsAC = createAsyncThunk<ICommentState, string, { rejectValue: IApiError }>('get_comment', async (id, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await getComments(id);
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