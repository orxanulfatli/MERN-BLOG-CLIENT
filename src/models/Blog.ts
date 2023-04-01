import { IUser } from "./User"

export interface IBlog {
    _id?: string
    user: string | IUser
    title: string
    content: string
    description: string
    thumbnail: string | File
    category: string
    createdAt: string
}

export interface IHomeBlogs {
    _id: string
    name: string
    count: number
    blogs: IBlog[]
}
