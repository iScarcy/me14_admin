import { ILoginModel } from "./login.model";

export const initialState:ILoginModel={
   login:{
            displayName:"",
            token: "",   
            tokenExpireDate: null,
            role:""
   }
}