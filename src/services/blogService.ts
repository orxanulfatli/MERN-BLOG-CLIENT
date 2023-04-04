import { IBlog, IBlogsCategory, IHomeBlogs } from "../models/Blog";
import { $api, $mainAPi } from "./config";
import { CREATE_BLOG_URL, HOME_BLOGS_URL } from "./constants";

export const createBlog = async (blog: IBlog) => {
    return $api.post<IBlog>(CREATE_BLOG_URL,blog)
}

export const getHomeBlogs = async () => {
    return $mainAPi.get<IHomeBlogs[]>(HOME_BLOGS_URL)
}

export const getBlogsByCategory = async (id:string,value:string,limit:number) => {
    return $mainAPi.get(`/blogs/${id}${value}&limit=${limit}`)
}