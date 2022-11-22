export interface ILoginParams {
    email: string
    password: string
    code: string
}
export interface ILoginApi {
    login: (params: ILoginParams) => Promise<any>
    me: () => Promise<any>
}