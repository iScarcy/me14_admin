import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
constructor(private _dialog: MatDialog){
  
}

ngOnInit(): void {
  
  let config: MatDialogConfig = {
    panelClass: "dialog-responsive",
    disableClose: true        
  }
  
     
 let dialogRef = this._dialog.open(LoginComponent, config);

 }

  title = 'Messina14 Admin Page';
}
