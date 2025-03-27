import { ILogin } from "src/app/models/ILogin"

export interface ILoginRequest{
    username: string,
    password: string
}

export interface ILoginModel{
    login:ILogin
}