import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Branca } from '../models/Branca';
import { map, Observable, of } from 'rxjs';
import { IAlbum } from '../models/IAlbum';
import { baseGalleryApiUrl, baseGalleryPublicImageUrl } from '../app.costant';
import { IUploadFile } from '../models/IUploadFile';
import { IFoto } from '../models/IFoto';
import { IAlbumFoto } from '../models/IAlbumFoto';
import { IAlbumRequest } from '../models/IAlbumRequest';
import { IAlbumFotoRequest } from '../models/IAlbumFotoRequest';
import { IRotateAlbumFotoRequestModel, IRotateAlbumFotoStoreRequest } from '../shared/store/Albums/albums.model';
import { AppStateModel } from '../shared/store/Global/App.state';
import { Store } from '@ngrx/store';
import { selectToken } from '../shared/store/Login/login.selectors';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  token : string | undefined;

  constructor(private httpEvents: HttpClient, private _store: Store<AppStateModel>) { }

  getAlbums(branca: string | null):Observable<IAlbumFoto[]>{
   debugger;
     this._store.select(selectToken).subscribe((data) =>{
        this.token = data
        console.log(this.token);
      }); 

   var url: string = baseGalleryApiUrl+"album/"+branca+"/0";
  console.log(url);
    return this.httpEvents.get<Array<IAlbum>>(url).pipe(
      map(albums => albums.map(album => ({
        id: album.id,
        title: album.title,
        anno: album.anno,
        branca: album.branca, 
        folder:album.folder,
        imgFolderUrl:  baseGalleryPublicImageUrl + album.imgFolderUrl ,            
        foto: []
      })))
    );
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
        imgFolderUrl: baseGalleryPublicImageUrl + album.imgFolderUrl ,       
        status: album.status
      }))
     )
  }

  editAlbum(request:IAlbumRequest):Observable<IAlbum>{
   
    var url: string = baseGalleryApiUrl+"album";
    
    return this.httpEvents.patch<IAlbum>(url, request).pipe(
      map(album => ({
        id: album.id,
        title: album.title,
        anno: album.anno,
        branca: album.branca,
        folder: album.folder,
        imgFolderUrl: baseGalleryPublicImageUrl + album.imgFolderUrl ,       
        status: album.status
      }))
     )
  }

  deleteAlbum(id:number):Observable<Object>{
    var url: string = baseGalleryApiUrl+"album?idAlbum="+id;    
    return this.httpEvents.delete(url);
  }

  uploadAlbumImg(file: File):Observable<IUploadFile>{
    
    var url: string = baseGalleryApiUrl+"album/upload";
    const formData = new FormData();
    formData.append('file', file);

   return this.httpEvents.post<IUploadFile>(url, formData).pipe(
    map(data => ({file:  data.file}))
   )
  }

 uploadAlbumFoto(request:IAlbumFotoRequest):Observable<Array<IFoto>>{
  
  var url: string = baseGalleryApiUrl+"album/photo";
  const formData = new FormData();
  formData.append("idAlbum", ""+request.idAlbum);
  for (const image of request.Files) {
    formData.append("files", image);
  }
  
  const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
  return this.httpEvents.post<Array<IFoto>>(url, formData);

 }

  getFoto(idAlbum:number):Observable<IAlbumFoto>{
    
    var url: string = baseGalleryApiUrl+"album/photo/"+idAlbum;
    return this.httpEvents.get<IAlbumFoto>(url).pipe(
      map(album => ({
        id: album.id,
        title: album.title,
        anno: album.anno,
        branca: album.branca, 
        folder: '',
        imgFolderUrl: baseGalleryPublicImageUrl + album.imgFolderUrl,       
        foto: album.foto
      }))
     )
  }

  deleteFoto(id:number):Observable<Object>{
    var url: string = baseGalleryApiUrl+"album/photo?idFoto="+id;    
    return this.httpEvents.delete(url);
  }

  rotateFoto(data:IRotateAlbumFotoRequestModel):Observable<number>{
   
   var url: string = baseGalleryApiUrl+"album/photo/rotate";
 // var url: string = "http://localhost:7065/api/Gallery/album/photo/rotate";
    return this.httpEvents.patch<number>(url, {"urlPhoto": data.request.urlPhoto, "idAlbum": data.request.idAlbum});

  }
}
