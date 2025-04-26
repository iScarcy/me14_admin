import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { baseUsersApiUrl } from '../app.costant';
import { IUserLoginResponse } from './rest/IUserLoginResponse';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  key:string =  "abcdefghijklmnop";

  constructor(private httpEvents: HttpClient) { }


  loginuser(username: string, password:string):Observable<IUserLoginResponse>{
      
    
      var url: string = baseUsersApiUrl+"SignIn"; 
      return this.httpEvents.post<IUserLoginResponse>(url, {email:username, password: this.encrypt(password)}).pipe(
        
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

  encrypt(password:string):string {
    var key = CryptoJS.enc.Utf8.parse('intermerdaschifo');
    var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
    
    var encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), key,
    { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

    return encryptedpassword.toString();
  }
}