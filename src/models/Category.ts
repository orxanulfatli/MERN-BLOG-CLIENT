export interface ICategoryRequest {
    name:string
}

export interface ICategory extends ICategoryRequest {
    _id: string
    createdAt?: string
    updatedAt?: string
}

export interface ICategoryResponse {
    categories:ICategory[]
}

