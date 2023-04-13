import { IComment } from "../models/Comments";
import { $api } from "./config";
import { CREATE_COMMENT_URL } from "./constants";

export const createComment = async (comment:IComment) => {
      return $api.post<IComment>(CREATE_COMMENT_URL,comment)
}