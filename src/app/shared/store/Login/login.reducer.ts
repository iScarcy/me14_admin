import { createReducer, on } from "@ngrx/store";
import { initialState } from "./login.state";
import { loginusersuccess } from "./login.actions";

const _loginReducer = createReducer(
    initialState,
    on(loginusersuccess, (state, action)=>{
        
        return {
           login: action.data   
        }
    }),
)

export function loginReducer(state: any, action: any) {
    return _loginReducer(state, action);
}
 
 