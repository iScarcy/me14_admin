import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IUtility } from 'src/app/services/rest/IUtility';
import { UtilityService } from 'src/app/services/utility.service';
import { UtilityDialogComponent } from './utility-dialog/utility-dialog.component';
import { IUtilityRequest } from 'src/app/services/rest/IUtilityRequest';

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.css']
})
export class UtilityComponent implements OnInit{
 
  utility:IUtility[] = [];

  constructor(private _service:UtilityService,  private _dialog: MatDialog){}
   
  ngOnInit(): void {
      this._service.getUtility().subscribe((data) => {this.utility = data.sort((a, b) => a.typeID - b.typeID);});
  }

  openUtilityDialog(id:number):void{
  
    let config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      disableClose: true,
      data: {titleDialog: "Aggiungi utilità", title: "", FC_idUtilityType:0,  callback: (request:IUtilityRequest) => this.new(request)} 
      
    }
    
    let dialogRed = this._dialog.open(UtilityDialogComponent, config)
  }

  new(request:IUtilityRequest){
  
    this._service.newUtility(request).subscribe((data) => {
        this.utility.push(data);
        this._dialog.closeAll();
    });
    
  }
}
