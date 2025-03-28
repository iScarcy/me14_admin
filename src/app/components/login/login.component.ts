import { Component, OnInit, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStateModel } from 'src/app/shared/store/Global/App.state';
import { loginuser } from 'src/app/shared/store/Login/login.actions';
import { ILoginRequest } from 'src/app/shared/store/Login/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  
   constructor(private _store: Store<AppStateModel>){}

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  FC_login = new FormControl('',[
    Validators.required
  ])

  FC_password = new FormControl('',[
    Validators.required
  ])

  ok(){
     
    if(this.FC_login.valid && this.FC_password.valid){
 
         this._store.dispatch(loginuser({username: this.FC_login.value!, password: this.FC_password.value!}));
    }
    
  }


}
