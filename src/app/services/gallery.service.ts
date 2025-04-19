import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Branca } from '../models/Branca';
import { map, Observable, of } from 'rxjs';
import { IAlbum } from '../models/IAlbum';
import { baseGalleryApiUrl, baseGalleryPublicImageUrl } from '../app.costant';
import { IUploadFile } from '../models/IUploadFile';
import { IFoto } from '../models/IFoto';
import { IAlbumFoto } from '../models/IAlbumFoto';
import { IAlbumRequest } from './rest/IAlbumRequest';
import { IAlbumFotoRequest } from './rest/IAlbumFotoRequest';
import { IRotateAlbumFotoRequestModel, IRotateAlbumFotoStoreRequest } from '../shared/store/Albums/albums.model';


@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  token : string | undefined;

  constructor(private httpEvents: HttpClient) { }

  getAlbums(branca: string , anno: string , token: string):Observable<IAlbumFoto[]>{
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  })

   var url: string = baseGalleryApiUrl+"album/"+branca+"/"+anno;
  
    return this.httpEvents.get<Array<IAlbum>>(url, {headers:headers}).pipe(
      map(albums => albums.map(album => ({
        id: album.id,
        title: album.title,
        anno: album.anno,
        branca: album.branca, 
        imgFolderUrl:  baseGalleryPublicImageUrl + album.imgFolderUrl ,            
        foto: []
      })))
    );
  }

  


  newAlbum(request:IAlbumRequest, token:string):Observable<IAlbum>{
   
    
    var url: string = baseGalleryApiUrl+"album";
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.httpEvents.post<IAlbum>(url, request, {headers:headers}).pipe(
      map(album => ({
        id: album.id,
        title: album.title,
        anno: album.anno,
        branca: album.branca,
        //folder: album.folder,
        imgFolderUrl: baseGalleryPublicImageUrl + album.imgFolderUrl ,       
        status: album.status
      }))
     )
  }

  editAlbum(request:IAlbumRequest, token:string):Observable<IAlbum>{
   
    var url: string = baseGalleryApiUrl+"album";
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })


    return this.httpEvents.patch<IAlbum>(url, request, {headers: headers}).pipe(
      map(album => ({
        id: album.id,
        title: album.title,
        anno: album.anno,
        branca: album.branca,
        imgFolderUrl: album.imgFolderUrl ,       
        status: album.status
      }))
     )
  }

  deleteAlbum(id:number, token:string):Observable<Object>{
    var url: string = baseGalleryApiUrl+"album?idAlbum="+id;    
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.httpEvents.delete(url,{headers: headers});
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

  getFoto(idAlbum:number , token: string):Observable<IAlbumFoto>{
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
   

    var url: string = baseGalleryApiUrl+"album/photo/"+idAlbum;
    return this.httpEvents.get<IAlbumFoto>(url, {headers:headers}).pipe(
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

  deleteFoto(id:number, token: string):Observable<Object>{
    
    var url: string = baseGalleryApiUrl+"album/photo?idFoto="+id;    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.httpEvents.delete(url, {headers: headers});
  }

  rotateFoto(data:IRotateAlbumFotoRequestModel):Observable<number>{
   
   var url: string = baseGalleryApiUrl+"album/photo/rotate";
 // var url: string = "http://localhost:7065/api/Gallery/album/photo/rotate";
    return this.httpEvents.patch<number>(url, {"urlPhoto": data.request.urlPhoto, "idAlbum": data.request.idAlbum});

  }
}
