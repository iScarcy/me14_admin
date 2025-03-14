import { createReducer, on } from "@ngrx/store";
import { initialState } from "./login.state";
import { loginusersuccess } from "./login.actions";

const _loginReducer = createReducer(
    initialState,
    on(loginusersuccess, (state, action)=>{
           
        return {
            token: action.token , 
            error: "",
            isLoading: true
        }
    }),
)

export function loginReducer(state: any, action: any) {
    return _loginReducer(state, action);
}
 
 