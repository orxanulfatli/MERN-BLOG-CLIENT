import { ICategory, ICategoryRequest, ICategoryResponse } from "../models/Category";
import { $api, $mainAPi } from "./config";
import { CATEGORY_URL } from "./constants";

export const createCategory = async (data: ICategoryRequest) => {
    return $api.post<ICategory>(CATEGORY_URL,data)
}

export const getCategories = () => {
    return $mainAPi.get<ICategoryResponse>(CATEGORY_URL)
}

export const updateCategory = async (data:ICategory) => {
    return $api.patch<{ message: string }>(`/api/category/${data._id}`,{name:data.name})
}

export const deleteCategory = async (id:string) => {
    return $api.delete<{ message: string }>(`/api/category/${id}`)
    
}