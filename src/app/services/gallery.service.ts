import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Branca } from '../models/Branca';
import { map, Observable, of } from 'rxjs';
import { IAlbum } from '../models/IAlbum';
import { baseGalleryApiUrl, baseGalleryPublicImageUrl } from '../app.costant';
import { IUploadFile } from '../models/IUploadFile';
import { IFoto } from '../models/IFoto';
import { IAlbumFoto } from '../models/IAlbumFoto';
import { IAlbumRequest } from '../models/IAlbumRequest';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private httpEvents: HttpClient) { }

  getAlbums(branca: string | null):Observable<IAlbumFoto[]>{
   console.log(branca);
   var url: string = baseGalleryApiUrl+"albums/"+branca;
   /*
   {
    "id": 99,
    "title": "Firma Carta di Clan 5 Aprile 2019",
    "anno": 2019,
    "branca": "rs",
    "folder": "1556076955_firma_carta_di_clan_5_aprile_2019",
    "file": "1556076955_IMG_8403.JPG",
    "data": "2019-04-24T05:35:57",
    "status": 1
}
   */ 
    return this.httpEvents.get<Array<IAlbum>>(url).pipe(
      map(albums => albums.map(album => ({
        id: album.id,
        title: album.title,
        anno: album.anno,
        branca: album.branca, 
        folder:album.folder,
        imgPathFolder:  baseGalleryPublicImageUrl + album.anno + "/" + album.branca + "/" + album.folder + "/" + album.file,     
       
        foto: []
      })))
    );
  }

  uploadAlbumImg(file: File):Observable<IUploadFile>{
    
    var url: string = baseGalleryApiUrl+"album/upload";
    const formData = new FormData();
    formData.append('file', file);

   return this.httpEvents.post<IUploadFile>(url, formData).pipe(
    map(data => ({file:  data.file}))
   )
  }

  getFoto(album:string):Observable<IAlbumFoto>{
    
    var url: string = baseGalleryApiUrl+"photo/"+album;
    return this.httpEvents.get<IAlbumFoto>(url).pipe(
      map(album => ({
        id: album.id,
        title: album.title,
        anno: album.anno,
        branca: album.branca, 
        folder: '',
        imgPathFolder: baseGalleryPublicImageUrl + album.imgPathFolder,       
        foto: album.foto
      }))
     )
  }

  deleteAlbum(id:number):Observable<Object>{
    var url: string = baseGalleryApiUrl+"album?idAlbum="+id;    
    return this.httpEvents.delete(url);
  }

  newAlbum(request:IAlbumRequest):Observable<IAlbum>{
   
    var url: string = baseGalleryApiUrl+"album";
    
    return this.httpEvents.post<IAlbum>(url, request).pipe(
      map(album => ({
        id: album.id,
        title: album.title,
        anno: album.anno,
        branca: album.branca,
        folder: album.folder,
        file: album.file,
        fullPath: baseGalleryPublicImageUrl + album.anno + "/" + album.branca + "/" + album.folder + "/" + album.file,       
        status: album.status
      }))
     )

  }
}
