export interface ILoginCredentials  {
    account: string;
    password: string;
}

export interface IRegisterCredentials extends ILoginCredentials {
    name: string
    cfPassword:string
}

export interface IUser extends ILoginCredentials {
    _id: string
    name: string
    avatar: string
    role: string
    type: string
    updatedAt: string
}

export interface IAuth {
    success: boolean
    message:string|null
    accessToken: string
    user:IUser
}
