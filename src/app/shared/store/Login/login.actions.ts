import { createAction, props } from "@ngrx/store";
import { ILoginRequest } from "./login.model";
import { ILogin } from "src/app/models/ILogin";

export const LOGIN_USER     = '[Login page] login user'
export const LOGIN_SUCCESS  = '[Login page] login user success'
export const LOGIN_FAILD    = '[Login page] login user faild'
export const LOGOUT_USER    = '[Login page] logut user'
export const LOGOUT_SUCCESS = '[Login page] logut user'

export const loginuser=createAction(LOGIN_USER, props<{ username:string, password:string }>());
export const loginusersuccess=createAction(LOGIN_SUCCESS, props<{ data: ILogin}>());
export const loginuserfaild=createAction(LOGIN_FAILD);

export const logoutuser=createAction(LOGOUT_USER);
export const logoutusersuccess=createAction(LOGOUT_SUCCESS, props<{ data: ILogin}>());
