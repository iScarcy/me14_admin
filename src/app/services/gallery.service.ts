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

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private httpEvents: HttpClient) { }

  getAlbums(branca: string | null):Observable<IAlbumFoto[]>{
   
   var url: string = baseGalleryApiUrl+"albums/"+branca;
 
    return this.httpEvents.get<Array<IAlbum>>(url).pipe(
      map(albums => albums.map(album => ({
        id: album.id,
        title: album.title,
        anno: album.anno,
        branca: album.branca, 
        folder:album.folder,
        folderUrl:  baseGalleryPublicImageUrl + album.folderUrl + "/" + album.file,     
       
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
        file: album.file,
        folderUrl: baseGalleryPublicImageUrl + album.folderUrl + "/" + album.file,       
        status: album.status
      }))
     )
  }

  editAlbum(request:IAlbumRequest):Observable<IAlbum>{
   
    var url: string = baseGalleryApiUrl+"album";
    
    return this.httpEvents.post<IAlbum>(url, request).pipe(
      map(album => ({
        id: album.id,
        title: album.title,
        anno: album.anno,
        branca: album.branca,
        folder: album.folder,
        file: album.file,
        folderUrl: baseGalleryPublicImageUrl + album.folderUrl + "/" + album.file,       
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

  getFoto(album:string):Observable<IAlbumFoto>{
    
    var url: string = baseGalleryApiUrl+"photo/"+album;
    return this.httpEvents.get<IAlbumFoto>(url).pipe(
      map(album => ({
        id: album.id,
        title: album.title,
        anno: album.anno,
        branca: album.branca, 
        folder: '',
        folderUrl: baseGalleryPublicImageUrl + album.folderUrl,       
        foto: album.foto
      }))
     )
  }

  deleteFoto(id:number):Observable<Object>{
    var url: string = baseGalleryApiUrl+"album/photo?idFoto="+id;    
    return this.httpEvents.delete(url);
  }


}
