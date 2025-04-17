export interface ILogin{
    displayName:string,
    token: string;   
    tokenExpireDate:Date | null,
    role:string
}