import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { AppStateModel } from './shared/store/Global/App.state';
import { Store } from '@ngrx/store';
import { selectIsLoading } from './shared/store/Login/login.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
constructor(private _dialog: MatDialog, private _store: Store<AppStateModel>){

}

ngOnInit(): void {
  
    let config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      disableClose: true        
    }
    
      
  let dialogRef = this._dialog.open(LoginComponent, config);

  
  this._store.select(selectIsLoading).subscribe((data) =>{
    if(data){
      dialogRef.close();
    }
  }); 


 }

  title = 'Messina14 Admin Page';
}
