import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { AlbumFotoDialogData } from 'src/app/models/dialog/AlbumFotoDialogData';
import { IAlbum } from 'src/app/models/IAlbum';
import { IAlbumFoto } from 'src/app/models/IAlbumFoto';
import { IAlbumFotoRequest } from 'src/app/models/IAlbumFotoRequest';
import { IFoto } from 'src/app/models/IFoto';


@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit {
  
  albumTitle:string = "";

  al:IAlbumFoto = {
    id: 0,
    title: '',
    anno: 0,
    branca: '',
    folder: '',
    imgFolderUrl: '',
    foto: []
  }; 
 

  file_store!: FileList;
 

  onRotate = new EventEmitter();

  onUploadAlbumFoto = new EventEmitter<IAlbumFotoRequest>();
  
  onDelete = new EventEmitter<number>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: AlbumFotoDialogData, private dialog: MatDialog){
    
  }

  ngOnInit(): void {
    this.al = this.data.album;
  
  }

  rotate():void{
      this.onRotate.emit();
  }

  delete(id:number):void{
 
    this.onDelete.emit(id);
  }

  handleFileInputChange(l: FileList ): void {
    this.file_store = l;
    if (l.length) {
   
     const f = l;
    
     const files : Array<File> = [];
      
     for(var i=0;i<f.length;i++){
      files.push(f[i]);
     }
     
     var fotoRequest : IAlbumFotoRequest = {
       idAlbum: this.al?.id,
       Files: files
     }
      
      this.onUploadAlbumFoto.emit(fotoRequest);
    } 

    

  }
}
