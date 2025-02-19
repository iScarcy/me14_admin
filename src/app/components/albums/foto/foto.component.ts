import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  
  foto: IFoto[] | undefined;
  constructor(@Inject(MAT_DIALOG_DATA) public data: AlbumFotoDialogData){
    
  }

  ngOnInit(): void {
    this.albumTitle = this.data.album.title
    this.foto = this.data.album.foto
    /*
    this.album  =  this._route.snapshot.paramMap.get('album')!;
    this.albumphoto$   = this._service.getFoto(this.album);
    this.albumphoto$.subscribe((album)=>{
      this.al.title = album.title
      this.foto = album.foto
    })
     */
  }

}
