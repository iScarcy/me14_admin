import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { RuntimeConfigService } from './runtime-config.service';
import { IUserLoginResponse } from './rest/IUserLoginResponse';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  key:string =  "abcdefghijklmnop";

  constructor(private httpEvents: HttpClient, private config: RuntimeConfigService) { }


  loginuser(username: string, password:string):Observable<IUserLoginResponse>{
      
    
      var url: string = this.config.settings.baseUsersApiUrl+"SignIn"; 
      return this.httpEvents.post<IUserLoginResponse>(url, {email:username, password: this.encrypt(password)}).pipe(
        
        map(resp => ({
                  token:resp.token,
                  expire:resp.expire,
                  user:resp.user
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
