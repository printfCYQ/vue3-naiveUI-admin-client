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

export interface IRoleParams {
    id: number
}

export interface IRoleItemParams {
    id?: number
    roleName: string
    permissions?: string[]
}

export interface IRoleDelParams {
    ids: number[]
}
export interface IRoleApi {
    roles: (params: IRoleListParams) => Promise<any>
    role: (params: IRoleParams) => Promise<any>
    create: (params: IRoleItemParams) => Promise<any>
    update: (params: IRoleItemParams) => Promise<any>
    remove: (params: IRoleDelParams) => Promise<any>
}