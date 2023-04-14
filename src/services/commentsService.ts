import { ICommentState } from "../Global/comment/slice";
import { IComment } from "../models/Comments";
import { $api, $mainAPi } from "./config";
import { CREATE_COMMENT_URL } from "./constants";

export const createComment = async (comment:IComment) => {
      return $api.post<IComment>(CREATE_COMMENT_URL,comment)
}

export const getComments = async (blog_id:string) => {
      return $mainAPi.get<ICommentState>(`/comments/blog/${blog_id}`)
}