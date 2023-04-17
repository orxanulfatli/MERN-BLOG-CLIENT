import { ICommentState } from "../Global/comment/slice";
import { IComment } from "../models/Comments";
import { $api, $mainAPi } from "./config";
import { CREATE_COMMENT_URL, REPLY_COMMENT_URL } from "./constants";

export const createComment = async (comment:IComment) => {
      return $api.post<IComment>(CREATE_COMMENT_URL,comment)
}

export const getComments = async (blog_id:string,num:any,limit:number) => {
      return $mainAPi.get<ICommentState>(`/api/comments/blog/${blog_id}?page=${num}&limit=${limit}`)
}

export const replyComment = async (data:IComment) => {
      return $api.post(REPLY_COMMENT_URL,data)
}

export const updateComment = async (id:string,data:IComment) => {
      return $api.patch<{ message: string }>(`/api/comment/${id}`,{data})
}
export const deleteComment = async (id: string) => {
      return $api.delete<{ message: string }>(`/api/comment/${id}`)
}