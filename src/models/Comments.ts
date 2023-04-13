import { IUser } from "./User"

export interface IComment {
    _id?: string
    user: IUser|null
    blog_id: string
    blog_user_id: string
    content: string
    replyCM?: IComment[]
    reply_user?: string
    createdAt: string
}