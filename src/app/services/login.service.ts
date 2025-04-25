import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { baseUsersApiUrl } from '../app.costant';
import { IUserLoginResponse } from './rest/IUserLoginResponse';
import { ILogin } from '../models/ILogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpEvents: HttpClient) { }


  loginuser(username: string, password:string):Observable<IUserLoginResponse>{
       
      var url: string = baseUsersApiUrl+"SignIn"; 
      return this.httpEvents.post<IUserLoginResponse>(url, {email:username, password:password}).pipe(
        
        map(resp => ({
                  name:resp.name,
                  username: resp.username,
                  token:resp.token,
                  expire:resp.expire,
                  role:resp.role,
                }))
      );
     
  }

  logoutuser(username: string):Observable<string>{
   
    return from("");
  }
}