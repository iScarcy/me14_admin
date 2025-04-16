import { createReducer, on } from "@ngrx/store";
import { initialState } from "./login.state";
import { loginusersuccess, logoutusersuccess } from "./login.actions";

const _loginReducer = createReducer(
    initialState,
    on(loginusersuccess, (state, action)=>{
        
        return {
           login: action.data   
        }
    }),
    on(logoutusersuccess, (state, action)=>{
        
        return {
           login: {
                    email:"",
                    token: ""
                }   
        }
    })
)

export function loginReducer(state: any, action: any) {
    return _loginReducer(state, action);
}
 
 