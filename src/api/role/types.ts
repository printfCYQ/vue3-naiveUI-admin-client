export interface ILoginParams {
    email: string
    password: string
    code: string
}

export interface IRoleListParams {
    page: number
    pageSize: number
    roleName?: string
}

export interface IRoleItemParams {
    id?: number
    roleName: string
}

export interface IRoleDelParams {
    ids: number[]
}
export interface IRoleApi {
    roles: (params: IRoleListParams) => Promise<any>
    create: (params: IRoleItemParams) => Promise<any>
    update: (params: IRoleItemParams) => Promise<any>
    remove: (params: IRoleDelParams) => Promise<any>
}