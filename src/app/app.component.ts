import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { AppStateModel } from './shared/store/Global/App.state';
import { Store } from '@ngrx/store';

import { LocalStorageService } from './services/local-storage.service';
import { selectIsLogged } from './shared/store/Login/login.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
constructor(private _dialog: MatDialog, private _store: Store<AppStateModel>, private _localStorage: LocalStorageService){

}

ngOnInit(): void {
  
  let config: MatDialogConfig = {
    panelClass: "dialog-responsive",
    disableClose: true        
  }
  
    this._store.select(selectIsLogged).subscribe((data) =>{
    
    if(!data){
      let dialogRef = this._dialog.open(LoginComponent, config); 
     
    }else{
      let dialogRef = this._dialog.getDialogById("mat-mdc-dialog-0");      
      dialogRef?.close();
    }

  }); 
   
}



  title = 'Messina14 Admin Page';
}
