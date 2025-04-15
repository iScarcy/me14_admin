import { Injectable } from "@angular/core";
import { LOGIN_USER, loginusersuccess } from "./login.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoginService } from "src/app/services/login.service";
import { map, exhaustMap } from "rxjs";
import { ILoginRequest } from "./login.model";
import { LocalStorageService } from "src/app/services/local-storage.service";

@Injectable()
export class LoginEffects {
     effects$ = createEffect(() =>
        this.action$.pipe(
          ofType(LOGIN_USER),
          exhaustMap((request: ILoginRequest) => {
           
            return this.service.loginuser(request.username,request.password).pipe(
              map((resp) => {
                this.localStorage.set("token",resp);
                return loginusersuccess({data:{
                  email: request.username,
                  token: resp,
                  error: "",
                  isLoading: true
                }});
               
              })
            );
          })
        )
      );
  
       constructor(
            private action$: Actions,
            private service: LoginService,
            private localStorage: LocalStorageService   
        ) {}
}