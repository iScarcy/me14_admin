import { Component, OnInit, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateModel } from 'src/app/shared/store/Global/App.state';
import { loginuser } from 'src/app/shared/store/Login/login.actions';
import { ILoginRequest } from 'src/app/shared/store/Login/login.model';
import { selectLoginFailed } from 'src/app/shared/store/Login/login.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private _store: Store<AppStateModel>){}
  isErr : boolean = false;
  ngOnInit(): void {
    

      this._store.select(selectLoginFailed).subscribe((resp) =>{
      
       this.isErr = resp
    
      }); 
  }

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
