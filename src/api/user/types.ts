export interface ILoginParams {
    email: string
    password: string
    code: string
}

export interface IPaginationParams {
    page: number
    pageSize: number
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
    users: (params: IPaginationParams) => Promise<any>
    create: (params: IUserItemParams) => Promise<any>
    update: (params: IUserItemParams) => Promise<any>
    remove: (params: IUserDelParams) => Promise<any>
}