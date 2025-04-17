import { createReducer, on } from "@ngrx/store";
import { initialState } from "./login.state";
import { loginuserfaild, loginusersuccess, logoutusersuccess } from "./login.actions";

const _loginReducer = createReducer(
    initialState,
    on(loginusersuccess, (state, action)=>{
        
        return {
           login: action.data   
        }
    }),
    on(loginuserfaild, (state, action)=>{
     
        return {
            login: {
                displayName:"",
                token: "",   
                tokenExpireDate:null,
                role:""
            }  
        }
    }),
    on(logoutusersuccess, (state, action)=>{
        
        return {
           login: {
                    displayName:"",
                    token: "",   
                    tokenExpireDate:null,
                    role:""
                }   
        }
    })
)

export function loginReducer(state: any, action: any) {
    return _loginReducer(state, action);
}
 
 