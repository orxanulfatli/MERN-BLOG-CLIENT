import { ICommentState } from "../Global/comment/slice";
import { IComment } from "../models/Comments";
import { $api, $mainAPi } from "./config";
import { CREATE_COMMENT_URL, REPLY_COMMENT_URL } from "./constants";

export const createComment = async (comment:IComment) => {
      return $api.post<IComment>(CREATE_COMMENT_URL,comment)
}

export const getComments = async (blog_id:string,num:any,limit:number) => {
      return $mainAPi.get<ICommentState>(`/comments/blog/${blog_id}?page=${num}&limit=${limit}`)
}

export const replyComment = async (data:IComment) => {
      return $api.post(REPLY_COMMENT_URL,data)
}