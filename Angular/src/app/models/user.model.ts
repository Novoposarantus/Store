export interface LoginUser{
    login: string,
    password: string
}

export interface ViewUser{
    userName: string,
    roleName: string
}

export interface AccessUser{
    id: number,
    userId: number,
    userName: string,
    Date: string,
    namePage: string
}
export interface LoginResponse {
    access_token: string,
    timeOut: number,
    userName: string,
    permissions: string[]
}