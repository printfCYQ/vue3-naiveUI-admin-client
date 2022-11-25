export interface ILoginParams {
    email: string
    password: string
    code: string
}

export interface TUserListParams {
    page: number
    pageSize: number
    email?: string
    userName?: string
    roles?: string
}

export interface TUserParams {
    id: number
}

export interface IUserItemParams {
    id?: number
    email: string
    userName: string
    avatar: string
    roles?: Array<any>
}

export interface IUserDelParams {
    ids: number[]
}
export interface IUserApi {
    login: (params: ILoginParams) => Promise<any>
    me: () => Promise<any>
    users: (params: TUserListParams) => Promise<any>
    user: (params: TUserParams) => Promise<any>
    create: (params: IUserItemParams) => Promise<any>
    update: (params: IUserItemParams) => Promise<any>
    remove: (params: IUserDelParams) => Promise<any>
}