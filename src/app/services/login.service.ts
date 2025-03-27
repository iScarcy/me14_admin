import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { baseSecurityApiUrl } from '../app.costant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpEvents: HttpClient) { }


  loginuser(username: string, password:string):Observable<string>{
      debugger;
      var url: string = baseSecurityApiUrl+"CreateToken"; 
      return this.httpEvents.post<string>(url, {username:username, password:password});
     
  }

}