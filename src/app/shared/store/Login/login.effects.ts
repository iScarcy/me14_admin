import { Injectable } from "@angular/core";
import { LOGIN_USER, loginusersuccess } from "./login.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoginService } from "src/app/services/login.service";
import { map, exhaustMap } from "rxjs";
import { ILoginRequest } from "./login.model";

@Injectable()
export class LoginEffects {
     effects$ = createEffect(() =>
        this.action$.pipe(
          ofType(LOGIN_USER),
          exhaustMap((request: ILoginRequest) => {
            debugger;
            return this.service.loginuser(request.username,request. password).pipe(
              map((data) => {
               
                return loginusersuccess({token: data});
               
              })
            );
          })
        )
      );
  
       constructor(
            private action$: Actions,
            private service: LoginService   
        ) {}
}