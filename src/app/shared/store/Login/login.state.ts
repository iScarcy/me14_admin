import { ILoginModel } from "./login.model";

export const initialState:ILoginModel={
   login:{
       token: "",
       error: "",
       isLoading: false
   }
}