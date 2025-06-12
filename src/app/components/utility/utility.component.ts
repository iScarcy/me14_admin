import { Component,  OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IUtility } from 'src/app/services/rest/IUtility';
import { UtilityService } from 'src/app/services/utility.service';
import { UtilityDialogComponent } from './utility-dialog/utility-dialog.component';
import { IUtilityRequest } from 'src/app/services/rest/IUtilityRequest';
import { ConfirmComponent } from '../confirm/confirm.component';

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

  openNewUtilityDialog():void{
  
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

  editUtilityListener(utility:IUtility){
    this.openEditUtilityDialog(utility);  
  }

  openEditUtilityDialog(utility:IUtility):void{
  
    let config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      disableClose: true,
      data: {titleDialog: "Modifica utilità", id: utility.id, title: utility.name, FC_idUtilityType:utility.typeID,  callback: (request:IUtilityRequest) => this.edit(request)} 
      
    }
    
    let dialogRed = this._dialog.open(UtilityDialogComponent, config)
  }

  edit(request:IUtilityRequest){

    this._service.editUtility(request).subscribe((data) => {
        this.utility.push(data);
        this._dialog.closeAll();
    });
    
  }

  deleteUtilityListener(id:number){
    this.openDeleteConfirmDialog(id);
  }

  openDeleteConfirmDialog(id:number): void {
    
    let config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      disableClose: true,
      data: {message: "Confermi di voler eliminare questa utilità ?", callback: () => this.delete(id)}    
    }
  
    
    let dialogRef = this._dialog.open(ConfirmComponent, config);
              
  }

  delete(id:number){
      this._service.deleteUtility(id).subscribe((data) => {
         
        this._dialog.closeAll();
    });
    
  }
}
