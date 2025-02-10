import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IAlbum } from 'src/app/models/IAlbum';
import { IAlbumFoto } from 'src/app/models/IAlbumFoto';
import { IFoto } from 'src/app/models/IFoto';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit {
  
  album:string = "";
  albumphoto$: Observable<IAlbumFoto> | undefined;
  al:IAlbum =  {
    id: 0,
    title: '',
    anno: 0,
    branca: "",
    folder: '',
    file: '',
    fullPath: '',
    status: false
  };
  foto: IFoto[] | undefined;
  constructor(private _service:GalleryService, private _route:ActivatedRoute ){
    
  }

  ngOnInit(): void {
    
    this.album  =  this._route.snapshot.paramMap.get('album')!;
    this.albumphoto$   = this._service.getFoto(this.album);
    this.albumphoto$.subscribe((album)=>{
      this.al.title = album.title
      this.foto = album.foto
    })
     
  }

}
