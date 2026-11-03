export interface IUserLoginResponse{
    token:string,
    expire:Date,
    user: IUser
}

 export interface IUser{
    id:number,
    email:string,
    displayName:string,
    role:string
}