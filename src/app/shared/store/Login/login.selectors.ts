import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateModel } from "../Global/App.state";

const getloginstate = createFeatureSelector<AppStateModel>("login");

export const selectToken = createSelector(getloginstate, (state) => {
    
    return state.login.token;
})
 
export const selectIsLogged = createSelector(getloginstate, (state) => {
    
    return state.login.token!=null && state.login.token.length>0  && state.login.token!="err";
})

export const selectLoginFailed = createSelector(getloginstate, (state) => {
    
    return state.login.token!=null && state.login.token==="err";
})

export const selectUserLogged = createSelector(getloginstate, (state) => {
    
    return state.login.displayName
})