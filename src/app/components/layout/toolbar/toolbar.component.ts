import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateModel } from 'src/app/shared/store/Global/App.state';
import { logoutuser } from 'src/app/shared/store/Login/login.actions';
import { selectUserLogged } from 'src/app/shared/store/Login/login.selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent  implements OnInit {
  
  constructor(private _store: Store<AppStateModel>){}

  @Output() toogleSidenav = new EventEmitter<void>();
  
  userLogged: string | undefined;
  
  ngOnInit(): void {
   this._store.select(selectUserLogged).subscribe((email) =>{
      this.userLogged = email
     });
  }
  
   logout(){
      this._store.dispatch(logoutuser({username: this.userLogged!}));      
    }

}
