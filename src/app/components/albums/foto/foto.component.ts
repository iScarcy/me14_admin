import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { AlbumFotoDialogData } from 'src/app/models/dialog/AlbumFotoDialogData';
import { IAlbum } from 'src/app/models/IAlbum';
import { IAlbumFoto } from 'src/app/models/IAlbumFoto';
import { IFoto } from 'src/app/models/IFoto';


@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit {
  
  albumTitle:string = "";
  albumphoto$: Observable<IAlbumFoto> | undefined;
  al:IAlbumFoto | undefined; 
  foto: IFoto[] | undefined;

  file_store!: FileList;
  file_list: Array<string> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: AlbumFotoDialogData, private dialog: MatDialog){
    
  }

  ngOnInit(): void {
    this.al = this.data.album;
  
  }

  handleFileInputChange(l: FileList ): void {
    this.file_store = l;
    if (l.length) {
      const f = l;
      console.log(f);
     
     for(var i=0;i<f.length;i++){
        console.log(f[i].name);
        var foto : IFoto = {
          id: 0,
          thumbPathFile: f[i].name,
          mediumPathFile: '',
          albumID: 0,
          file: '',
          fullPathFile: ''
        }
        debugger;
        this.al?.foto.push(foto)
     }
      
          const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      
      
      

    } 

    

  }
}
