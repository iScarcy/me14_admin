import { createAction, props } from "@ngrx/store";
import { ILoginRequest } from "./login.model";

export const LOGIN_USER     = '[Login page] login user'
export const LOGIN_SUCCESS  = '[Login page] login user success'
export const LOGIN_FAILD    = '[Login page] login user faild'

export const loginuser=createAction(LOGIN_USER, props<{ username:string, password:string }>());
export const loginusersuccess=createAction(LOGIN_SUCCESS, props<{ token: string}>());
export const loginuserfaild=createAction(LOGIN_FAILD, props<{ error: string}>());