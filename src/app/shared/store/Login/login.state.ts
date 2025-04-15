import { ILoginModel } from "./login.model";

export const initialState:ILoginModel={
   login:{
        email:"",
        token: "",
        error: "",
        isLoading: false
   }
}