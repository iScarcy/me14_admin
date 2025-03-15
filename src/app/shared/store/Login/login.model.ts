export interface ILoginRequest{
    username: string,
    password: string
}

export interface ILoginModel{
    token: string;
    error: string;
    isLoading: boolean;
}