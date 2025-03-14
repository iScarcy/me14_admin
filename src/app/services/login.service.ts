import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpEvents: HttpClient) { }


  loginuser(username: string, password:string):string{
    return "token";
  }

}