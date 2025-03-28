import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateModel } from "../Global/App.state";

const getloginstate = createFeatureSelector<AppStateModel>("login");

export const selectToken = createSelector(getloginstate, (state) => {
    
    return state.login.token;
})
 
 
export const selectError = createSelector(getloginstate, (state) => {
    
    return state.login.error;
})

export const selectIsLoading = createSelector(getloginstate, (state) => {
   
    return state.login.isLoading;
})