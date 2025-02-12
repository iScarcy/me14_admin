import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IAlbum } from 'src/app/models/IAlbum';
import { ConfirmComponent } from '../../confirm/confirm.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit{
  
  @Input() album:IAlbum = {
    id: 0,
    title: '',
    anno: 0,
    branca: "",
    folder: '',
    file: '',
    fullPath: '',
    status: false
  };

  @Output() public deleteAlbumEmitter:EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
  
  }

  constructor(private dialog: MatDialog){

  }

  delete(id:number){
    this.dialog.closeAll();
    this.deleteAlbumEmitter.emit(id);
  }

  openDeleteConfirmDialog(id:number): void {
    
    let config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      disableClose: true,
      data: {message: "Confermi di voler eliminare questo album ?", callback: () => this.delete(id)}    
    }
  
   
    let dialogRef = this.dialog.open(ConfirmComponent, config);
    
          
  }

}
